import DashboardAside from "@/components/dashboard/DashboardAside";
import DashboardTop from "@/components/dashboard/DashboardTop";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full flex min-h-screen bg-gray-50">
        <DashboardAside></DashboardAside>
        <div className="flex flex-1 flex-col">
          <DashboardTop></DashboardTop>
          <main className="flex-1 p-4 ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
