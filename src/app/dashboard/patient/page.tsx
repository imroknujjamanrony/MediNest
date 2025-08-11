// app/dashboard/patient/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PatientPage() {
  const myAppointments = [
    { id: 1, doctor: "Dr. Smith", date: "2025-08-15", status: "approved" },
    { id: 2, doctor: "Dr. Adams", date: "2025-08-20", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {myAppointments.map((appt) => (
              <li
                key={appt.id}
                className="flex justify-between border-b pb-2 last:border-none"
              >
                <span>{appt.doctor}</span>
                <span>{appt.date}</span>
                <span className="text-gray-500">{appt.status}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
