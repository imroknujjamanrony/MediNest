/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";

import {
  doctorFormSchema,
  DoctorFormType,
} from "@/lib/validation/doctorFormSchema";
import { useSaveDoctorApplicationMutation } from "@/features/doctorApi";

export default function DoctorApplicationForm() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDoctorApplication] = useSaveDoctorApplicationMutation();

  const form = useForm<DoctorFormType>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      fullName: "",
      email: session?.user?.email || "",
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
    if (!session?.user?.id) {
      toast.error("You must be logged in to submit this form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Log payload for debugging
      console.log("Form submission payload:", {
        ...data,

        consultationFee: Number(data.fee || 0),
        experience: Number(data.experience || 0),
      });

      // Prepare payload with user ID
      const payload = {
        ...data,
        consultationFee: Number(data.fee || 0),
        experience: Number(data.experience || 0),
      };

      await saveDoctorApplication(payload).unwrap();

      toast.success("Application submitted successfully!");
      form.reset();
    } catch (error: any) {
      console.error("Submission error:", error);

      let errorMessage = "Failed to submit application";
      if (error.data?.error?.includes("duplicate key error")) {
        if (error.data.error.includes("email")) {
          errorMessage = "This email is already registered";
        } else if (error.data.error.includes("licenseNumber")) {
          errorMessage = "This license number is already in use";
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Doctor Application Form
          </CardTitle>
          {!session && (
            <p className="text-red-500 text-sm">
              You must be logged in to submit this form
            </p>
          )}
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
                            // disabled={!!session?.user?.email}
                            value={session?.user?.email || field.value}
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
                              Cardiologist
                            </SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="pediatrics">
                              Pediatrics
                            </SelectItem>
                            <SelectItem value="surgery">Surgery</SelectItem>
                            <SelectItem value="orthopedics">
                              Orthopedics
                            </SelectItem>
                            <SelectItem value="dermatology">
                              Dermatology
                            </SelectItem>
                            <SelectItem value="psychiatry">
                              Psychiatry
                            </SelectItem>
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
                <p className="text-sm text-muted-foreground mt-2">
                  Upload your documents to a cloud service (e.g., Google Drive,
                  Dropbox) and paste the shareable links here
                </p>
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
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select day" />
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
                        <FormItem className="flex-1">
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
                        <FormItem className="flex-1">
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
                      className="mt-2 md:mt-0"
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
                    <FormItem className="max-w-xs">
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">
                            ৳
                          </span>
                          <Input
                            type="number"
                            placeholder="Enter fee amount"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !session}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              {!session && (
                <p className="text-red-500 text-center mt-2">
                  Please sign in to submit your application
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
