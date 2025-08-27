'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Edit, Pencil, User, CalendarIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import PhotoUploadDialog from '@/components/profile/DialogBoxes/PhotoUploadDialog'
import usegetImageURL from '@/hooks/user/usegetImageURL'

import api from '@/lib/httpClient'
import { toTitleCase } from '@/lib/format.utility'
import { useProfile } from '../ProfileContext'

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const ProfilePage: React.FC = () => {
  const [editMode, setEditMode] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const { data, loading, updateProfile, fetchData } = useProfile()
  const { getImageURL, loading: imageLoading } = usegetImageURL()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: undefined,
    },

  })

  const { formState: { errors } } = form



  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile({
        ...values,
        gender: values.gender as 'male' | 'female' | 'other',
        dateOfBirth: values.dateOfBirth.toISOString(),
      })
      setEditMode(false)
      fetchData()


    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = () => {
    setEditMode(true)

    const dateValue = data?.dateOfBirth ? new Date(data.dateOfBirth) : undefined
    form.reset({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      gender: (data.gender as ProfileFormValues['gender']) || '',
      dateOfBirth: dateValue,
    })
  }
  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const fileData = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        refId: data?._id || '',
        belongsTo: 'user' as const,
      }

      const uploadUrl = await getImageURL(fileData)

      await fetch(uploadUrl.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      const responseS3Url = await api.get(`/s3-file/${uploadUrl.s3Response}/s3Url`)
      await updateProfile({ avatar: responseS3Url.data.s3Url })
      fetchData()
      setDialogOpen(false)
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  const isLoading = loading || !data
  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <>

      <div className="bg-white rounded-2xl shadow-md p-0">

        <div className="flex bg-blue-50/30 items-center justify-between mb-6 p-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="text-gray-700" size={16} />
              <h1 className="text-2xl font-semibold text-gray-800">Personal Details</h1>

            </div>
            <p className="text-sm text-muted-foreground">
              Manage your personal information here.
            </p>

          </div>


          <Button variant="outline" onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

        </div>


        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">

              <Image
                src={data?.avatar || '/images/default-avatar.png'}
                alt="Profile"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />

            </div>

            <button
              className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
              onClick={() => setDialogOpen(true)}
              disabled={uploading}
            >
              <Edit className="w-4 h-4 text-gray-700" />
            </button>

          </div>
        </div>

        <div className="p-4">
          {editMode ? (
            <>
              <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">First Name</label>
                  <Input
                    placeholder="First Name"
                    {...form.register('firstName')}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">Last Name</label>
                  <Input
                    placeholder="Last Name"
                    {...form.register('lastName')}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">Gender</label>
                  <Select
                    value={form.watch('gender')}
                    onValueChange={(value) =>
                      form.setValue('gender', value as ProfileFormValues['gender'])
                    }
                  >
                    <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                {/* DOB */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 font-medium">Date of Birth</label>
                  <div className="flex gap-2">
                    <Select
                      value={form.watch("dateOfBirth")?.getFullYear()?.toString()}
                      onValueChange={(year) => {
                        const currentDate = form.watch("dateOfBirth") || new Date();
                        const newDate = new Date(currentDate);
                        newDate.setFullYear(parseInt(year));
                        form.setValue("dateOfBirth", newDate);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: new Date().getFullYear() - 18 - 1940 + 1 },
                          (_, i) => (
                            <SelectItem key={1940 + i} value={(1940 + i).toString()}>
                              {1940 + i}
                            </SelectItem>
                          )
                        ).reverse()}
                      </SelectContent>
                    </Select>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch("dateOfBirth") && "text-muted-foreground",
                            errors.dateOfBirth && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("dateOfBirth") ? (
                            format(form.watch("dateOfBirth"), "dd MMMM")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.watch("dateOfBirth")}
                          onSelect={(date: Date | undefined) => date && form.setValue("dateOfBirth", date)}
                          disabled={(date) => {
                            const eighteenYearsAgo = new Date();
                            eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
                            return date > eighteenYearsAgo || date < new Date("1940-01-01");
                          }}
                          initialFocus
                          defaultMonth={form.watch("dateOfBirth")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>


              </form>
            </>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-100 p-2 rounded-md w-full'>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">First Name</h4>
                  <p className="text-base text-gray-800">{data?.firstName || 'Update your name'}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">Last Name</h4>
                  <p className="text-base text-gray-800">{data?.lastName || 'Update your last name'}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">Gender</h4>
                  <p className="text-base text-gray-800">{toTitleCase(data?.gender) || 'Update gender'}</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm text-gray-500">Date of Birth</h4>
                  <p className="text-base text-gray-800">
                    {data?.dateOfBirth ? format(new Date(data.dateOfBirth), 'PPP') : 'Update your DOB'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>


        {editMode && (
          <div className="border-t p-2 flex items-center justify-end gap-2">
            <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>


      <PhotoUploadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpload={handleUpload}
        loading={uploading || imageLoading || loading}
      />
    </>


  )
}

export default ProfilePage


