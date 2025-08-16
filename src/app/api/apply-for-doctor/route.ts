// app/api/doctors/route.ts
import { NextResponse } from "next/server";

import { DoctorApplication } from "@/models/doctorApplication";
import { dbConnect } from "@/lib/dbConnect";


// GET: সব doctors ফেচ করো
export async function GET() {
  try {
    await dbConnect();
    const doctors = await DoctorApplication.find();
    return NextResponse.json(doctors, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: নতুন doctor application সেভ করো
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // ✅ Validation check mongoose schema দিয়েই হবে
    const newApplication = new DoctorApplication(body);
    await newApplication.save();

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error: any) {
    console.error("Doctor save error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
