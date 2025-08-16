import { createSlice } from "@reduxjs/toolkit";

interface Schedule{
    day:string,
    startTime:string,
    endTime:string
}

interface DoctorFormApplication{
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
  schedule: Schedule[];
}

const initialState:DoctorFormApplication[]=[];

const doctorFormSlice=createSlice({
    name:'doctorsApplication',
    initialState,
    reducers:{}
})