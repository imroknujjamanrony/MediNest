"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ApplyDoctorForm() {
  const [schedule, setSchedule] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const addSchedule = () => {
    setSchedule([...schedule, { day: "", startTime: "", endTime: "" }]);
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    const updated = [...schedule];
    updated[index][field as keyof (typeof updated)[number]] = value;
    setSchedule(updated);
  };

  const removeSchedule = (index: number) => {
    const updated = schedule.filter((_, i) => i !== index);
    setSchedule(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call here
    console.log("Form submitted");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Doctor Application Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Basic Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="Enter full name" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" />
                </div>
              </div>
            </section>

            {/* Professional Info */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Professional Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Specialization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Medical License Number</Label>
                  <Input placeholder="BMDC Reg. No." />
                </div>
                <div>
                  <Label>License Issue Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>License Expiry Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input type="number" placeholder="e.g. 5" />
                </div>
                <div>
                  <Label>Current Workplace / Hospital Name</Label>
                  <Input placeholder="Enter workplace name" />
                </div>
              </div>
            </section>

            {/* Documents */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Documents (URLs)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>National ID / Passport URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <div>
                  <Label>Medical Degree Certificate URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <div>
                  <Label>BMDC Registration Certificate URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <div>
                  <Label>Profile Photo URL</Label>
                  <Input placeholder="https://..." />
                </div>
              </div>
            </section>

            {/* Availability */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>
              {schedule.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-2 items-center mb-2"
                >
                  <Select
                    onValueChange={(val) => updateSchedule(index, "day", val)}
                  >
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      updateSchedule(index, "startTime", e.target.value)
                    }
                  />
                  <Input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      updateSchedule(index, "endTime", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeSchedule(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addSchedule}>
                + Add Day
              </Button>
            </section>

            {/* Fee */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Consultation Fee</h2>
              <Input type="number" placeholder="Enter fee amount" />
            </section>

            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
