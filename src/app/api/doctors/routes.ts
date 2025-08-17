import { dbConnect } from "@/lib/dbConnect";
import { DoctorApplication } from "@/models/doctorApplication";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ DB Connected in GET Doctors API");

    const doctors = await DoctorApplication.find();
    console.log("✅ Doctors Fetched:", doctors);

    return NextResponse.json(doctors, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error in GET /api/doctors:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}