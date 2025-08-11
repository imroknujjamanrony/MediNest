"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <div className="text-lg font-semibold">Welcome, Admin</div>
      <Avatar>
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </header>
  );
}
