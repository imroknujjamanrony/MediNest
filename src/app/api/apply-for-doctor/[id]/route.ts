
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";

// import { dbConnect } from "@/lib/dbConnect";
// import { DoctorApplication } from "@/models/doctorApplication";
// import { User } from "@/models/user";
// import { authOptions } from "@/lib/authOptions";
// import { DoctorResponse } from "@/types/doctor";
// import { Error as AppError } from "@/types/user";


// /**
//  * 🔹 GET /api/apply-for-doctor/[id]
//  * Fetch doctor application details by ID
//  */
// export async function GET(
//   _req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();

//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const doc = await DoctorApplication.findById(params.id)
//       .populate({
//         path: "userId",
//         select: "email role name",
//         model: User,
//       })
//       .lean() as DoctorResponse | null;

//     if (!doc) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     // Only admin or the owner can see
//     const isAdmin = session.user?.role === "admin";
//     if (!isAdmin && String(doc.userId?._id) !== session.user?.id) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json<DoctorResponse>(doc, { status: 200 });
//   } catch (err) {
//     console.error("GET /apply-for-doctor/[id] error:", err);
//     return NextResponse.json({ error:(err as AppError).error }, { status: 500 });
//   }
// }

// /**
//  * 🔹 PATCH /api/apply-for-doctor/[id]
//  * Update doctor application status & sync user role
//  */
// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//     const { id } = params;
//     const { status } = await request.json();

//     if (!status) {
//       return NextResponse.json(
//         { message: "Status is required" },
//         { status: 400 }
//       );
//     }

 
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // 1. Update application
//       const updatedApplication = await DoctorApplication.findByIdAndUpdate(
//         id,
//         { status },
//         { new: true, session }
//       ) as DoctorResponse | null;

//       if (!updatedApplication) {
//         throw new Error("Doctor application not found");
//       }

//       // 2. If approved → update user role
//       if (status === "approved") {
//         const userId = updatedApplication.userId;
//         if (!userId) throw new Error("User ID missing in application");

//         await User.findByIdAndUpdate(
//           userId,
//           { role: "doctor" },
//           { new: true, session }
//         );
//       }

//       await session.commitTransaction();
//       session.endSession();

//       return NextResponse.json<DoctorResponse>(updatedApplication, { status: 200 });
//     } catch (error) {
//       await session.abortTransaction();
//       session.endSession();
//       throw error;
//     }
//   } catch (error) {
//     console.error("PATCH Error:", error);
//     return NextResponse.json(
//       { message: "Failed to update doctor status", error: (error as AppError).error },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { dbConnect } from "@/lib/dbConnect";
import { DoctorApplication } from "@/models/doctorApplication";
import { User } from "@/models/user";
import { authOptions } from "@/lib/authOptions";
import { DoctorResponse } from "@/types/doctor";
import { Error as AppError } from "@/types/user";

/**
 * 🔹 GET /api/apply-for-doctor/[id]
 * Fetch doctor application details by ID
 */
export async function GET(
  request: Request, 
  context: { params: { id: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doc = await DoctorApplication.findById(context.params.id)
      .populate({
        path: "userId",
        select: "email role name",
        model: User,
      })
      .lean() as DoctorResponse | null;

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Only admin or the owner can see
    const isAdmin = session.user?.role === "admin";
    if (!isAdmin && String(doc.userId?._id) !== session.user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json<DoctorResponse>(doc, { status: 200 });
  } catch (err) {
    console.error("GET /apply-for-doctor/[id] error:", err);
    return NextResponse.json(
      { error: (err as AppError)?.error ?? "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * 🔹 PATCH /api/apply-for-doctor/[id]
 * Update doctor application status & sync user role
 */
export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = context.params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Update application
      const updatedApplication = await DoctorApplication.findByIdAndUpdate(
        id,
        { status },
        { new: true, session }
      ) as DoctorResponse | null;

      if (!updatedApplication) {
        throw new Error("Doctor application not found");
      }

      // 2. If approved → update user role
      if (status === "approved") {
        const userId = updatedApplication.userId;
        if (!userId) throw new Error("User ID missing in application");

        await User.findByIdAndUpdate(
          userId,
          { role: "doctor" },
          { new: true, session }
        );
      }

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json<DoctorResponse>(updatedApplication, { status: 200 });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      {
        message: "Failed to update doctor status",
        error: (error as AppError)?.error ?? "Internal server error",
      },
      { status: 500 }
    );
  }
}
