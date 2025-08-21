
// import { NextResponse } from "next/server";
// import { DoctorApplication } from "@/models/doctorApplication";
// import { dbConnect } from "@/lib/dbConnect";



// export async function GET() {
//   try {
//     await dbConnect();
//     const doctors = await DoctorApplication.find()
//       .populate({
//         path: "userId",
//         select: "role email", // Include both role and email
//         model: "User"
//       })
//       .lean();
      
//     console.log("Fetched doctors:", doctors);
//     return NextResponse.json(doctors, { status: 200 });
//   } catch (error: any) {
//     console.error("GET Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // for POST method
// export async function POST(req: Request) {
//   try {
//     await dbConnect();
//     console.log("✅ DB Connected in POST Doctors API");

//     const body = await req.json();
//     console.log("📩 Body Received:", body);

//     const newApplication = new DoctorApplication(body);
//     await newApplication.save();

//     console.log("✅ Doctor Saved:", newApplication);
//     return NextResponse.json(newApplication, { status: 201 });
//   } catch (error: any) {
//     console.error("❌ Application for Doctor save error:", error);
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }




// app/api/doctors/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { dbConnect } from "@/lib/dbConnect";
import { DoctorApplication } from "@/models/doctorApplication";
import { authOptions } from "@/lib/authOptions";
import { User } from "@/models/user";


// GET /api/doctors
export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin? -> all. Otherwise -> only own applications
    const isAdmin = session.user?.role === "admin";
    const query = isAdmin ? {} : { userId: session.user.id };

    const doctors = await DoctorApplication.find(query)
      .populate({
        path: "userId",
        select: "role email",
        model: User, // or "User" string, but Model import is safer
      })
      .lean();

    return NextResponse.json(doctors, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/doctors Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/doctors
export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // --- Server-side normalization / security ---
    // client theke asha email/userId trust korbo na
    const {
      email: _ignoreEmail,
      userId: _ignoreUserId,
      fee,
      experience,
      ...rest
    } = body;

    // Optional: prevent duplicate application per user
    const already = await DoctorApplication.findOne({ userId: session.user.id });
    if (already) {
      return NextResponse.json(
        { error: "Application already submitted" },
        { status: 409 }
      );
    }

    const newApplication = await DoctorApplication.create({
      ...rest,
      userId: session.user.id,
      email: session.user.email, // keep a denormalized email if your schema has it
      consultationFee: Number(fee ?? 0),
      experience: Number(experience ?? 0),
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error: any) {
    // Handle duplicate key nicely
    if (error?.code === 11000) {
      const key = Object.keys(error.keyPattern || {})[0] || "field";
      return NextResponse.json(
        { error: `Duplicate value for ${key}` },
        { status: 409 }
      );
    }
    console.error("POST /api/doctors Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
