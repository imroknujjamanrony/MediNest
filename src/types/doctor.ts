// src/types/doctor.ts

export interface ISchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export type DoctorStatus = "pending" | "approved" | "rejected";

// Base fields (form, api response, schema সব জায়গায় common)
export interface DoctorBase {
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
}


// ✅ এখানে API response এর জন্য extend করো
export interface DoctorResponse extends DoctorBase {
  _id: string;
  userId: string;
  status: DoctorStatus;
  createdAt: string;
}