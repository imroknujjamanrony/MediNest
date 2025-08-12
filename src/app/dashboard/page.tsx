// import DashboardAside from "@/components/dashboard/DashboardAside";
import DashboardTop from "@/components/dashboard/DashboardTop";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div>
        <h1>hello from DashboardLayout</h1>
        <DashboardTop></DashboardTop>
      </div>
    </SidebarProvider>
  );
}
