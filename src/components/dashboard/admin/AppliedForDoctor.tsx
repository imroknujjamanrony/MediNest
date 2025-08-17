/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetDoctorsQuery } from "@/features/doctorApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminDoctorsPage() {
  const { data, isLoading, isError, error } = useGetDoctorsQuery();

  if (isLoading) return <p className="p-4">Loading doctors...</p>;

  if (isError)
    return (
      <div className="p-4 text-red-500">
        <h2 className="text-lg font-bold">Error Loading Doctors</h2>
        <p>{(error as any)?.data?.error || (error as any)?.status}</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">List of Doctors</h1>

      <div className="rounded-2xl border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[250px]">Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Member Since</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((doctor: any) => (
              <TableRow key={doctor._id} className="hover:bg-gray-50">
                {/* Doctor Name + Avatar */}
                <TableCell className="flex items-center gap-3">
                  <img
                    src={doctor.profileUrl || "/default-avatar.png"}
                    alt={doctor.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{doctor.fullName}</span>
                </TableCell>

                {/* Specialization */}
                <TableCell>{doctor.specialization}</TableCell>

                {/* Member Since */}
                <TableCell>
                  {doctor.createdAt
                    ? new Date(doctor.createdAt).toLocaleDateString()
                    : "—"}
                </TableCell>

                {/* Role (just hardcoding as "Doctor" for now) */}
                <TableCell className="text-center">Doctor</TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  <Badge
                    variant={
                      doctor.status === "approved"
                        ? "success"
                        : doctor.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {doctor.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
