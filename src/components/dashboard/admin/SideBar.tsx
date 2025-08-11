"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Users, Calendar, Settings, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "Doctors", href: "/dashboard/doctors", icon: Stethoscope },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function SideBar() {
  const [open, setOpen] = useState(false);

  const Menu = () => (
    <div className="flex flex-col gap-2 p-4">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <item.icon className="w-5 h-5" />
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-lg">
        {Menu()}
      </aside>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="m-2 md:hidden">
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {Menu()}
        </SheetContent>
      </Sheet>
    </>
  );
}
