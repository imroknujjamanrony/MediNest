/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  useGetDoctorsQuery,
  useUpdateDoctorStatusMutation,
} from "@/features/doctorApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminDoctorsPage() {
  const { data, isLoading, isError, error, refetch } = useGetDoctorsQuery();
  const [updateDoctorStatus] = useUpdateDoctorStatusMutation();

  const handleStatusChange = async (doctorId: string, newStatus: string) => {
    try {
      await updateDoctorStatus({ id: doctorId, status: newStatus }).unwrap();
      toast.success(`Doctor status updated to ${newStatus}`);

      // Refresh data after status change
      refetch();
    } catch (err: any) {
      toast.error(err.message || "Error updating status");
    }
  };

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
      <h1 className="text-2xl text-center font-semibold mb-6">
        List of All Requested Doctors
      </h1>

      <div className="rounded-2xl border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[250px]">Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Member Since</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead className="text-center">Details</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">User Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((doctor: any) => (
              <TableRow key={doctor._id} className="hover:bg-gray-50">
                <TableCell className="flex items-center gap-3">
                  <img
                    src={doctor.profileUrl || "/default-avatar.png"}
                    alt={doctor.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{doctor.fullName}</span>
                </TableCell>

                <TableCell>{doctor.specialization}</TableCell>

                <TableCell>
                  {doctor.createdAt
                    ? new Date(doctor.createdAt).toLocaleDateString()
                    : "—"}
                </TableCell>

                {/* Action dropdown */}
                <TableCell className="text-center">
                  <Select
                    value={doctor.status}
                    onValueChange={(value) =>
                      handleStatusChange(doctor._id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Approved</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Rejected</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>Pending</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* details */}
                <TableCell className="text-center">
                  <Link href={`/dashboard/admin/doctors/${doctor._id}`}>
                    Details
                  </Link>
                </TableCell>

                {/* Application Status */}
                <TableCell className="text-center">
                  <Badge
                    variant={
                      doctor.status === "approved"
                        ? "default"
                        : doctor.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {doctor.status}
                  </Badge>
                </TableCell>

                {/* User Role */}
                <TableCell className="text-center">
                  <Badge
                    variant={
                      doctor.userId?.role === "doctor" ? "default" : "outline"
                    }
                  >
                    {doctor.userId?.role || "patient"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty state */}
        {data?.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No doctor applications found
          </div>
        )}
      </div>

      {/* Debug info - remove in production */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
