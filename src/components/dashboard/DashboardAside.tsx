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
import Link from "next/link";
import { GiDoctorFace, GiStitchedWound } from "react-icons/gi";

export default function DashboardAside() {
  //for admin dashboard
  const adminItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/dashboard/admin/profile",
      icon: User,
    },
    {
      title: "Total Users",
      url: "/dashboard/admin/users",
      icon: User2,
    },
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
    {
      title: "Doctors",
      url: "/dashboard/admin/doctors",
      icon: GiDoctorFace,
    },
    {
      title: "Reviews",
      url: "/dashboard/admin/reviews",
      icon: StarIcon,
    },
  ];

  //for doctor dashboard
  const doctorItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/dashboard/doctor/profile",
      icon: Inbox,
    },
    {
      title: "Total Users",
      url: "/dashboard/users",
      icon: User2,
    },
    {
      title: "Appointments",
      url: "/dashboard/doctor/appointments",
      icon: GiStitchedWound,
    },

    {
      title: "Doctors",
      url: "/dashboard/doctors",
      icon: GiDoctorFace,
    },
  ];

  //for patient dashboard
  const patientItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/dashboard/patient/my-profile",
      icon: Inbox,
    },
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

    {
      title: "Doctors",
      url: "/dashboard/patient/doctors",
      icon: GiDoctorFace,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
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
              <DropdownMenuTrigger className="flex items-center gap-2">
                <User2> </User2>john Doe
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
