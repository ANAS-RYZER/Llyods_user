"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserRoundIcon as UserRoundPen,
  Wallet2,
  CreditCard,
  Package,
  LogOut,
  ChevronDown,
  Bookmark,
  ChartNoAxesCombinedIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Replace with your actual global state
const useProfilePhotoStore = () => ({
  avatar: null,
  name: null,
});

const useUserDetails = () => ({
  clearUser: () => {},
});

const UserDropDown = ({ user }: { user: any }) => {
  const { avatar, name } = useProfilePhotoStore();
  const router = useRouter();
  const { clearUser } = useUserDetails();

  const [isOpen, setIsOpen] = useState(false);
  const [isFinancialsOpen, setIsFinancialsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const displayAvatar = avatar || user?.avatar;
  const displayName = name || user?.firstName || "User";

  const handleLogout = () => {
    setLoggingOut(true);
    sessionStorage.clear();
    clearUser();
    toast.success("Logged out successfully");

    setTimeout(() => {
      setLoggingOut(false);
      window.location.href = "/";
    }, 1000);
  };

  const toggleFinancials = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFinancialsOpen(!isFinancialsOpen);
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-lg p-0 "
          aria-label="User Menu"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={displayAvatar || "/placeholder.svg"}
              alt="User avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-500 text-white">
              {displayName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-64 p-1" sideOffset={5}>
        <DropdownMenuLabel className="text-gray-600 px-3 py-2">
          Hi, {displayName?.split(" ")[0] || "User"} 👋
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="mt-1">
          <DropdownMenuItem
            onClick={() => router.push("/profile1/personal")}
            className="cursor-pointer"
          >
            <UserRoundPen className="mr-2 h-4 w-4" />
            My Profile
          </DropdownMenuItem>

          <div>
            <DropdownMenuItem
              onClick={toggleFinancials}
              className="cursor-pointer flex items-center justify-between"
              onSelect={(event) => event.preventDefault()}
            >
              <div className="flex items-center">
                <Wallet2 className="mr-2 h-4 w-4" />
                <span>My financials</span>
              </div>
              <ChevronDown
                className={cn(
                  "ml-2 h-4 w-4 transition-transform duration-200",
                  isFinancialsOpen && "rotate-180"
                )}
              />
            </DropdownMenuItem>

            {isFinancialsOpen && (
              <div className="bg-gray-100 mx-1 rounded-md">
                <DropdownMenuItem
                  onClick={() => router.push("/portfolio/wallet")}
                  className="cursor-pointer pl-8 py-2"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  My Wallet
                </DropdownMenuItem>
              </div>
            )}
          </div>
          <DropdownMenuItem
            onClick={() => router.push("/portfolio")}
            className="cursor-pointer"
          >
            <ChartNoAxesCombinedIcon className="mr-2 h-4 w-4" />
            Portfolio
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/orders")}
            className="cursor-pointer"
          >
            <Package className="mr-2 h-4 w-4" />
            My Orders
          </DropdownMenuItem>
         
          <DropdownMenuItem
            onClick={() => router.push("/bookmarks")}
            className="cursor-pointer"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmarks
          </DropdownMenuItem>


        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
