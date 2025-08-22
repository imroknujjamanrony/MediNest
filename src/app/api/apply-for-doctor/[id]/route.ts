import { NextResponse } from "next/server";
import { DoctorApplication } from "@/models/doctorApplication";

import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";
import { User } from "@/models/user";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    const { status } = await request.json();

    console.log(`PATCH request for ID: ${id}, Status: ${status}`);

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Update the application status
      const updatedApplication = await DoctorApplication.findByIdAndUpdate(
        id,
        { status },
        { new: true, session }
      );

      if (!updatedApplication) {
        throw new Error("Doctor application not found");
      }

      console.log("Application updated:", updatedApplication);

      // 2. If approved, update user role
      if (status === "approved") {
        const userId = updatedApplication.userId;
        
        if (!userId) {
          throw new Error("User ID not found in application");
        }

        console.log(`Updating user role for ID: ${userId}`);
        
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { role: "doctor" },
          { new: true, session }
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        console.log("User role updated:", updatedUser);
      }

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(updatedApplication, { status: 200 });
    } catch (error: any) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { 
        message: "Failed to update doctor status", 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}



