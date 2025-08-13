// app/dashboard/admin/layout.tsx

import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout-container">
      {/* Optional: Admin-specific sidebar or header here */}
      {children}
    </div>
  );
}
