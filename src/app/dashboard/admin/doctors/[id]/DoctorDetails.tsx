"use client";

import {
  useGetDoctorByIdQuery,
  useUpdateDoctorStatusMutation,
} from "@/features/doctorApi";
import { Button } from "@/components/ui/button";

export default function DoctorDetails({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useGetDoctorByIdQuery(id);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateDoctorStatusMutation();

  if (isLoading) return <div className="p-6">Loading doctor details...</div>;
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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Doctor Details</h1>
        <p className="text-sm text-muted-foreground">ID: {id}</p>
      </div>

      <section className="grid md:grid-cols-2 gap-4">
        <Info label="Full Name" value={data.fullName} />
        <Info
          label="Email"
          value={(data as any).email || data?.userId?.email}
        />
        <Info label="Phone" value={data.phone} />
        <Info label="Specialization" value={data.specialization} />
        <Info label="Experience" value={`${data.experience ?? ""}`} />
        <Info label="Workplace" value={data.workplace} />
        <Info label="License No." value={data.licenseNumber} />
        <Info label="Issue Date" value={data.licenseIssueDate} />
        <Info label="Expiry Date" value={data.licenseExpiryDate} />
        <Info
          label="Consultation Fee"
          value={`${(data as any).consultationFee ?? data.fee}`}
        />
        <Info label="Status" value={(data as any).status ?? "pending"} />
        <Info label="User Role" value={data?.userId?.role} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Documents</h2>
        <DocLink label="NID / Passport" href={data.nidUrl} />
        <DocLink label="Degree" href={data.degreeUrl} />
        <DocLink label="BMDC" href={data.bmdcUrl} />
        <DocLink label="Profile" href={data.profileUrl} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Weekly Schedule</h2>
        <div className="space-y-2">
          {data.schedule?.map((s: any, idx: number) => (
            <div
              key={idx}
              className="rounded-md border p-3 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{s.day}</div>
                <div className="text-sm text-muted-foreground">
                  {s.startTime} - {s.endTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <Button onClick={onApprove} disabled={isUpdating}>
          Approve
        </Button>
        <Button variant="destructive" onClick={onReject} disabled={isUpdating}>
          Reject
        </Button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: any }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium break-all">{value ?? "-"}</div>
    </div>
  );
}

function DocLink({ label, href }: { label: string; href?: string }) {
  if (!href)
    return <div className="text-sm text-muted-foreground">{label}: -</div>;
  return (
    <div className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      <a className="underline" href={href} target="_blank" rel="noreferrer">
        {href}
      </a>
    </div>
  );
}
