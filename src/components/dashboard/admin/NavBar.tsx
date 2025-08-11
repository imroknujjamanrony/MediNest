"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function NavBar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <Input placeholder="Search..." className="w-1/3" />
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 cursor-pointer" />
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/40" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
