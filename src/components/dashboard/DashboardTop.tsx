import Image from "next/image";
import navLogo from "../../../public/logo.png";
import { Input } from "../ui/input";
import { LogOut, Search, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function DashboardTop() {
  return (
    <div className="flex items-center justify-between w-11/12 mx-auto">
      {/* left side logo and search */}
      <div className="flex items-center gap-2 ">
        <div className="flex items-center">
          <Image src={navLogo} alt="logo" width={50} height={50}></Image>
          <h1 className="text-2xl font-bold">MediNest</h1>
        </div>
        <div className="relative flex items-center justify-between">
          <Input
            placeholder="Search here"
            className="max-w-sm rounded-full"
          ></Input>
          <Search className="absolute right-2"></Search>
        </div>
      </div>
      {/* right side profile with dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <User></User>My Profile
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings></Settings>Setting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut></LogOut>Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
