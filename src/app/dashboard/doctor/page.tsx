// app/dashboard/doctor/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorPage() {
  const todayAppointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM" },
    { id: 2, patient: "Jane Roe", time: "11:30 AM" },
    { id: 3, patient: "David Lee", time: "2:00 PM" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Todays Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {todayAppointments.map((appt) => (
              <li
                key={appt.id}
                className="flex justify-between border-b pb-2 last:border-none"
              >
                <span>{appt.patient}</span>
                <span className="text-gray-500">{appt.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
