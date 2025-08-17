"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  doctorFormSchema,
  DoctorFormType,
} from "@/lib/validation/doctorFormSchema";
import { useSaveDoctorApplicationMutation } from "@/features/doctorApi";

export default function DoctorApplicationForm() {
  const [saveDoctorApplication, { isLoading, isSuccess, isError, error }] =
    useSaveDoctorApplicationMutation();

  const form = useForm<DoctorFormType>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      specialization: "",
      licenseNumber: "",
      licenseIssueDate: "",
      licenseExpiryDate: "",
      experience: "",
      workplace: "",
      nidUrl: "",
      degreeUrl: "",
      bmdcUrl: "",
      profileUrl: "",
      fee: "",
      schedule: [{ day: "", startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const onSubmit = async (data: DoctorFormType) => {
    // form fee (string) → API shape consultationFee (number)
    const { fee, ...rest } = data;
    const payload = {
      ...rest,
      consultationFee: Number(fee || 0),
      experience: Number(rest.experience || 0),
    };

    try {
      await saveDoctorApplication(payload as any).unwrap();
      form.reset();
    } catch (e) {
      console.error("Submit failed:", e);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Basic Info</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Professional Info */}
              <section>
                <h2 className="text-lg font-semibold mb-4">
                  Professional Info
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cardiology">
                              Cardiology
                            </SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="pediatrics">
                              Pediatrics
                            </SelectItem>
                            <SelectItem value="surgery">Surgery</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="BMDC Reg. No." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseIssueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Issue Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseExpiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Expiry Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workplace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Workplace / Hospital Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter workplace name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Documents */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Documents (URLs)</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nidUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National ID / Passport URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degreeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Degree Certificate URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bmdcUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BMDC Registration Certificate URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Photo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Weekly Schedule */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>
                {fields.map((f, index) => (
                  <div
                    key={f.id}
                    className="flex flex-col md:flex-row gap-2 items-center mb-2"
                  >
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.day`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
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
                                ].map((d) => (
                                  <SelectItem key={d} value={d}>
                                    {d}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.startTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.endTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    append({ day: "", startTime: "", endTime: "" })
                  }
                >
                  + Add Day
                </Button>
              </section>

              {/* Fee */}
              <section>
                <h2 className="text-lg font-semibold mb-4">Consultation Fee</h2>
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter fee amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
              {isSuccess && (
                <p className="text-green-600 mt-2">✅ Application Submitted!</p>
              )}
              {isError && <p className="text-red-600 mt-2">❌ Submit failed</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
