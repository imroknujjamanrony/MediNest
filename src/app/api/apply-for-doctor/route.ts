


import { NextResponse } from "next/server";
import { DoctorApplication } from "@/models/doctorApplication";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ DB Connected in GET Doctors API");

    const doctors = await DoctorApplication.find().lean();
    console.log("✅ Doctors Fetched:", doctors);

    return NextResponse.json(doctors, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error in GET /api/doctors:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// for POST method
export async function POST(req: Request) {
  try {
    await dbConnect();
    console.log("✅ DB Connected in POST Doctors API");

    const body = await req.json();
    console.log("📩 Body Received:", body);

    const newApplication = new DoctorApplication(body);
    await newApplication.save();

    console.log("✅ Doctor Saved:", newApplication);
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error: any) {
    console.error("❌ Application for Doctor save error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
