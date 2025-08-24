// import {
//   Home,
//   Inbox,
//   PanelTopInactiveIcon,
//   StarIcon,
//   User,
//   User2,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "../ui/sidebar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";
// import { GiDoctorFace, GiStitchedWound } from "react-icons/gi";

// export default function DashboardAside() {
//   //for admin dashboard
//   const adminItems = [
//     {
//       title: "Home",
//       url: "/",
//       icon: Home,
//     },
//     {
//       title: "Profile",
//       url: "/dashboard/admin/profile",
//       icon: User,
//     },
//     {
//       title: "Total Users",
//       url: "/dashboard/admin/users",
//       icon: User2,
//     },
//     {
//       title: "Appointments",
//       url: "/dashboard/admin/appointments",
//       icon: GiStitchedWound,
//     },
//     {
//       title: "Patients",
//       url: "/dashboard/admin/patients",
//       icon: PanelTopInactiveIcon,
//     },
//     {
//       title: "Doctors",
//       url: "/dashboard/admin/doctors",
//       icon: GiDoctorFace,
//     },
//     {
//       title: "Reviews",
//       url: "/dashboard/admin/reviews",
//       icon: StarIcon,
//     },
//   ];

//   //for doctor dashboard
//   const doctorItems = [
//     {
//       title: "Home",
//       url: "/",
//       icon: Home,
//     },
//     {
//       title: "Profile",
//       url: "/dashboard/doctor/profile",
//       icon: Inbox,
//     },
//     {
//       title: "Total Users",
//       url: "/dashboard/users",
//       icon: User2,
//     },
//     {
//       title: "Appointments",
//       url: "/dashboard/doctor/appointments",
//       icon: GiStitchedWound,
//     },

//     {
//       title: "Doctors",
//       url: "/dashboard/doctors",
//       icon: GiDoctorFace,
//     },
//   ];

//   //for patient dashboard
//   const patientItems = [
//     {
//       title: "Home",
//       url: "/",
//       icon: Home,
//     },
//     {
//       title: "Profile",
//       url: "/dashboard/patient/my-profile",
//       icon: Inbox,
//     },
//     {
//       title: "My Prescriptions",
//       url: "/dashboard/patient/my-prescriptions",
//       icon: User2,
//     },
//     {
//       title: "Appointments",
//       url: "/dashboard/patient/my-appointments",
//       icon: GiStitchedWound,
//     },

//     {
//       title: "Doctors",
//       url: "/dashboard/patient/doctors",
//       icon: GiDoctorFace,
//     },
//   ];
//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader></SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {adminItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger className="flex items-center gap-2">
//                 <User2> </User2>john Doe
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Billing</DropdownMenuItem>
//                 <DropdownMenuItem>Team</DropdownMenuItem>
//                 <DropdownMenuItem>Subscription</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardAside() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const links: Record<string, { name: string; path: string }[]> = {
    admin: [
      { name: "Overview", path: "/dashboard/admin" },
      { name: "Doctors", path: "/dashboard/admin/doctors" },
      { name: "Appointments", path: "/dashboard/admin/appointments" },
      { name: "Reports", path: "/dashboard/admin/reports" },
    ],
    doctor: [
      { name: "My Patients", path: "/dashboard/doctor/patients" },
      { name: "Schedule", path: "/dashboard/doctor/schedule" },
      { name: "Prescriptions", path: "/dashboard/doctor/prescriptions" },
    ],
    staff: [
      { name: "Appointments", path: "/dashboard/staff/appointments" },
      { name: "Add Patient", path: "/dashboard/staff/add-patient" },
    ],
    patient: [
      { name: "My Appointments", path: "/dashboard/patient/my-appointments" },
      { name: "Prescriptions", path: "/dashboard/patient/prescriptions" },
    ],
  };

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <nav className="space-y-2">
        {links[role || "patient"].map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="block p-2 hover:bg-gray-100 rounded"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
