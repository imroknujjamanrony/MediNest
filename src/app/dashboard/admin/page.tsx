import NavBar from "@/components/dashboard/admin/NavBar";
import SideBar from "@/components/dashboard/admin/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
