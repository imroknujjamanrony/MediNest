// app/dashboard/layout.tsx
import DashboardAside from "@/components/dashboard/DashboardAside";
import DashboardTop from "@/components/dashboard/DashboardTop";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <DashboardAside></DashboardAside>
        <div className="flex flex-1 flex-col">
          <DashboardTop></DashboardTop>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
