


import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { dbConnect } from "@/lib/dbConnect";
import { DoctorApplication } from "@/models/doctorApplication";
import { User } from "@/models/user";
import { authOptions } from "@/lib/authOptions";

/**
 * 🔹 GET /api/apply-for-doctor/[id]
 * Fetch doctor application details by ID
 */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doc = await DoctorApplication.findById(params.id)
      .populate({
        path: "userId",
        select: "email role name",
        model: User,
      })
      .lean();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Only admin or the owner can see
    const isAdmin = session.user?.role === "admin";
    if (!isAdmin && String(doc.userId?._id) !== session.user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (err: any) {
    console.error("GET /apply-for-doctor/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * 🔹 PATCH /api/apply-for-doctor/[id]
 * Update doctor application status & sync user role
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
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
      );

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

      return NextResponse.json(updatedApplication, { status: 200 });
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { message: "Failed to update doctor status", error: error.message },
      { status: 500 }
    );
  }
}
