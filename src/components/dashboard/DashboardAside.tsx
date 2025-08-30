"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { GiDoctorFace, GiStitchedWound } from "react-icons/gi";
import {
  Home,
  Inbox,
  PanelTopInactiveIcon,
  StarIcon,
  User,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ---- Menu Items ----
const menuItems = {
  admin: [
    { title: "Home", url: "/dashboard/admin", icon: Home },
    { title: "Profile", url: "/dashboard/admin/profile", icon: User },
    { title: "Total Users", url: "/dashboard/admin/users", icon: User2 },
    {
      title: "Appointments",
      url: "/dashboard/admin/appointments",
      icon: GiStitchedWound,
    },
    {
      title: "Patients",
      url: "/dashboard/admin/patients",
      icon: PanelTopInactiveIcon,
    },
    { title: "Doctors", url: "/dashboard/admin/doctors", icon: GiDoctorFace },
    { title: "Reviews", url: "/dashboard/admin/reviews", icon: StarIcon },
  ],
  doctor: [
    { title: "Home", url: "/dashboard/doctor", icon: Home },
    { title: "Profile", url: "/dashboard/doctor/profile", icon: Inbox },
    {
      title: "Appointments",
      url: "/dashboard/doctor/appointments",
      icon: GiStitchedWound,
    },
    { title: "My Patients", url: "/dashboard/doctor/patients", icon: User2 },
    {
      title: "Prescriptions",
      url: "/dashboard/doctor/prescriptions",
      icon: GiDoctorFace,
    },
  ],
  patient: [
    { title: "Home", url: "/dashboard/patient", icon: Home },
    { title: "Profile", url: "/dashboard/patient/my-profile", icon: Inbox },
    {
      title: "My Prescriptions",
      url: "/dashboard/patient/my-prescriptions",
      icon: User2,
    },
    {
      title: "Appointments",
      url: "/dashboard/patient/my-appointments",
      icon: GiStitchedWound,
    },
    { title: "Doctors", url: "/dashboard/patient/doctors", icon: GiDoctorFace },
  ],
  staff: [
    { title: "Home", url: "/dashboard/staff", icon: Home },
    {
      title: "Appointments",
      url: "/dashboard/staff/appointments",
      icon: GiStitchedWound,
    },
    { title: "Add Patient", url: "/dashboard/staff/add-patient", icon: User },
  ],
};

export default function DashboardAside() {
  const { data: session } = useSession();
  const role = (session?.user as { role: string })?.role || "admin"; // fallback admin for demo
  const items = menuItems[role] || [];

  return (
    <Sidebar collapsible="icon" className="bg-white border-r shadow-md">
      <SidebarHeader>
        <div className="px-3 py-4 font-bold text-lg text-blue-600">
          MediNest
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 uppercase text-xs">
            {role.charAt(0).toUpperCase() + role.slice(1)} Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                <User2 className="w-5 h-5 text-gray-600" />
                <span>{session?.user?.name || "John Doe"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
