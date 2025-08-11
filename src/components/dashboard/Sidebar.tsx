"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavItem from "./NavItem";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="p-2 md:hidden">
          <Menu size={24} />
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <nav className="flex flex-col gap-2">
            <NavItem href="/dashboard/admin" label="Admin Home" />
            <NavItem href="/dashboard/doctor" label="Doctor Home" />
            <NavItem href="/dashboard/patient" label="Patient Home" />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white  border-r">
        <div className="p-4 text-xl font-bold">Dashboard</div>
        <nav className="flex flex-col gap-2 p-4">
          <NavItem href="/dashboard/admin" label="Admin Home" />
          <NavItem href="/dashboard/doctor" label="Doctor Home" />
          <NavItem href="/dashboard/patient" label="Patient Home" />
        </nav>
      </aside>
    </>
  );
}
