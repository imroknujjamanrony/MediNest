// //src/types/applyDoctor.ts
// export type FormValues = {
//   fullName: string;
//   email: string;
//   phone: string;
//   dob: string;
//   specialization: string;
//   licenseNumber: string;
//   licenseIssueDate: string;
//   licenseExpiryDate: string;
//   experience: number;
//   workplace: string;
//   nidUrl: string;
//   degreeUrl: string;
//   bmdcUrl: string;
//  profileUrl: string; 
//   consultationFee: number;
//   schedule: { day: string; startTime: string; endTime: string }[];
// };


// src/types/applyDoctor.ts
import { DoctorBase } from "./doctor";


export type FormValues = DoctorBase;
