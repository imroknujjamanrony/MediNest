import z from "zod";

export const doctorFormSchema=z.object({
    
     fullName: z.string().min(3, "Full name is required"),
     
      phone: z.string().min(6, "Phone number required"),
      dob: z.string().nonempty("Date of birth required"),
      specialization: z.string().nonempty("Select specialization"),
      licenseNumber: z.string().nonempty("License number required"),
      licenseIssueDate: z.string().nonempty("Issue date required"),
      licenseExpiryDate: z.string().nonempty("Expiry date required"),
      experience: z.string().nonempty("Experience required"),
      workplace: z.string().nonempty("Workplace name required"),
      nidUrl: z.string().url("Enter valid URL"),
      degreeUrl: z.string().url("Enter valid URL"),
      bmdcUrl: z.string().url("Enter valid URL"),
      profileUrl: z.string().url("Enter valid URL"),
      fee: z.string().nonempty("Fee required"),
      schedule: z
        .array(
          z.object({
            day: z.string().nonempty(),
            startTime: z.string().nonempty(),
            endTime: z.string().nonempty(),
          })
        )
        .min(1, "At least one schedule is required"),
})

export type DoctorFormType = z.infer<typeof doctorFormSchema>;