"use client";

import {
  useGetDoctorByIdQuery,
  useUpdateDoctorStatusMutation,
} from "@/features/doctorApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default function DoctorDetails({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useGetDoctorByIdQuery(id);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateDoctorStatusMutation();

  if (isLoading)
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading doctor details...
      </div>
    );
  if (isError || !data)
    return (
      <div className="p-6 text-red-500">Failed to load doctor details</div>
    );

  const onApprove = async () => {
    await updateStatus({ id, status: "approved" }).unwrap();
    await refetch();
  };

  const onReject = async () => {
    await updateStatus({ id, status: "rejected" }).unwrap();
    await refetch();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Doctor Details</h1>
        <p className="text-sm text-muted-foreground">ID: {id}</p>
      </div>

      {/* Doctor Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Full Name" value={data.fullName} />
            <Info
              label="Email"
              value={(data as any).email || data?.userId?.email}
            />

            <Info label="Phone" value={data.phone} />
            <Info label="Specialization" value={data.specialization} />
            <Info label="Experience" value={`${data.experience ?? ""} years`} />
            <Info label="Workplace" value={data.workplace} />
            <Info label="License No." value={data.licenseNumber} />
            <Info label="Issue Date" value={data.licenseIssueDate} />
            <Info label="Expiry Date" value={data.licenseExpiryDate} />
            <Info
              label="Consultation Fee"
              value={`${
                (data as any).consultationFee ?? data.consultationFee
              } BDT`}
            />
            <Info
              label="Status"
              value={
                <Badge
                  variant={
                    (data as any).status === "approved"
                      ? "success"
                      : (data as any).status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {(data as any).status ?? "pending"}
                </Badge>
              }
            />
            <Info label="User Role" value={data?.userId?.role} />
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <DocLink label="NID / Passport" href={data.nidUrl} />
          <DocLink label="Degree" href={data.degreeUrl} />
          <DocLink label="BMDC" href={data.bmdcUrl} />
          <DocLink label="Profile" href={data.profileUrl} />
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-500" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.schedule?.length ? (
            data.schedule.map((s: any, idx: number) => (
              <div
                key={idx}
                className="rounded-md border p-3 flex items-center justify-between hover:bg-muted transition"
              >
                <div>
                  <div className="font-medium">{s.day}</div>
                  <div className="text-sm text-muted-foreground">
                    {s.startTime} - {s.endTime}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No schedule available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={onApprove}
          disabled={isUpdating}
          className="flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </Button>
        <Button
          variant="destructive"
          onClick={onReject}
          disabled={isUpdating}
          className="flex items-center gap-2"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </Button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: any }) {
  return (
    <div className="rounded-lg border p-3 bg-white hover:shadow-sm transition">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium break-words">{value ?? "-"}</div>
    </div>
  );
}

function DocLink({ label, href }: { label: string; href?: string }) {
  if (!href)
    return <div className="text-sm text-muted-foreground">{label}: -</div>;
  return (
    <div className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      <a
        className="underline text-blue-600 hover:text-blue-800"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        View Document
      </a>
    </div>
  );
}

//need to specify the type from any to specific type
