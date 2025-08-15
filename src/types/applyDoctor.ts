export type FormValues = {
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
  photoUrl: string;
  consultationFee: number;
  schedule: { day: string; startTime: string; endTime: string }[];
};