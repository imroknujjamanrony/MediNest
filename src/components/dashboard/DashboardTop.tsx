// import Image from "next/image";
// import navLogo from "../../../public/logo.png";
// import { Input } from "../ui/input";
// import { LogOut, Search, Settings, User } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { SidebarTrigger } from "../ui/sidebar";

// export default function DashboardTop() {
//   return (
//     <div className="flex items-center justify-between w-11/12 mx-auto">
//       {/* left side logo and search */}
//       <div className="flex items-center gap-2 ">
//         <div>
//           <SidebarTrigger></SidebarTrigger>
//         </div>
//         <div className="flex items-center">
//           <Image src={navLogo} alt="logo" width={50} height={50}></Image>
//           <h1 className="text-2xl font-bold">MediNest</h1>
//         </div>
//         <div className="relative flex items-center justify-between">
//           <Input
//             placeholder="Search here"
//             className="max-w-sm rounded-full"
//           ></Input>
//           <Search className="absolute right-2"></Search>
//         </div>
//       </div>
//       {/* right side profile with dropdown */}
//       <div>
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <Avatar>
//               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuLabel>
//               <User></User>My Profile
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <Settings></Settings>Setting
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <LogOut></LogOut>Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }

"use client";

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
import { SidebarTrigger } from "../ui/sidebar";

export default function DashboardTop() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between w-11/12 mx-auto py-2">
        {/* Left: Sidebar toggle + Logo + Search */}
        <div className="flex items-center gap-4">
          {/* Sidebar Trigger */}
          <SidebarTrigger />

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src={navLogo} alt="logo" width={40} height={40} />
            <h1 className="text-xl md:text-2xl font-bold text-blue-600">
              MediNest
            </h1>
          </div>

          {/* Search Bar (hidden on mobile) */}
          <div className="relative hidden md:flex items-center ml-4">
            <Input
              placeholder="Search here..."
              className="max-w-sm rounded-full pl-4 pr-8 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Right: Profile Dropdown */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-400 transition">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                My Profile
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
