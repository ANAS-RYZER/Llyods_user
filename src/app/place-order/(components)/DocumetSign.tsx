import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

const DocumetSign = () => {
  return (
    <>
      <div className="space-y-6">
              <div className="space-y-4">
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                         <div className='flex gap-2'>
                             <h4 className="font-semibold">Fractional Ownership Agreement</h4>
                          <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">
                            Signed
                          </span>
                         </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Document purpose and why this is important, write here
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className='flex gap-2'>
                            <h4 className="font-semibold">LLC Member Ownership</h4>
                          <span className="bg-yellow-100 text-yellow-800 text-xs rounded-full px-2 py-1">
                            Yet to sign
                          </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Document purpose and why this is important, write here
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
                 <hr/>
              {/* Legal Disclaimer */}
              <div className="text-sm px-2 text-gray-500 leading-relaxed w-[956px]">
                By proceeding, I agree to the {" "}
                <span className="text-blue-600 cursor-pointer underline">Investment Terms, SPV Participation Agreement,</span> and{" "}
                <span className="text-blue-600 cursor-pointer underline">Investor Onboarding Documents</span>. I also accept Lloyds {" "}
                <span className="text-blue-600 cursor-pointer underline">
                    Terms of Use, Payment Terms,
                </span>
                 {" "} and {" "}
                 <span className="text-blue-600 cursor-pointer underline">
                     Privacy Policy
                 </span>
                . I understand that my investment represents fractional ownership in a Special Purpose Vehicle (SPV) and may involve certain risks.
              </div>
            </div>
    </>
  )
}

export default DocumetSign

//   