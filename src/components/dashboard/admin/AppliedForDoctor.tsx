"use client";
import { useGetDoctorsQuery } from "@/features/doctorApi";

export default function AdminDoctorsPage() {
  const { data, isLoading, isError, error } = useGetDoctorsQuery();

  console.log("🔍 Doctors API Data:", data);
  console.log("🔍 API Error:", error);

  if (isLoading) return <p>Loading doctors...</p>;
  if (isError) return <p>Failed to load doctors.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">All Applied Doctors</h1>
      <ul className="space-y-2">
        {data?.map((d: any) => (
          <li key={d.email} className="p-3 rounded-lg border">
            <div className="font-medium">
              {d.fullName} — {d.specialization}
            </div>
            <div className="text-sm text-gray-500">{d.workplace}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
