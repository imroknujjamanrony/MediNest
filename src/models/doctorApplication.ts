import mongoose, { Schema, Document } from "mongoose";

export interface ISchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface IDoctorApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  specialization: string;
  licenseNumber: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  experience: number;
  workplace: string;
  nidUrl: string;
  degreeUrl: string;
  bmdcUrl: string;
 profileUrl: string; 
  consultationFee: number;
  schedule: ISchedule[];
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const scheduleSchema = new Schema<ISchedule>({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const doctorApplicationSchema = new Schema<IDoctorApplication>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseIssueDate: { type: String, required: true },
    licenseExpiryDate: { type: String, required: true },
    experience: { type: Number, required: true },
    workplace: { type: String, required: true },
    nidUrl: { type: String, required: true },
    degreeUrl: { type: String, required: true },
    bmdcUrl: { type: String, required: true },
    profileUrl: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    schedule: { type: [scheduleSchema], required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "applyForDoctors" } 
);

export const DoctorApplication =
  mongoose.models.DoctorApplication ||
  mongoose.model<IDoctorApplication>("DoctorApplication", doctorApplicationSchema);
