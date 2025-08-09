
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    console.log("✅ Received registration request:", body);

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await dbConnect();

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    // ✅ Save new user via model
    const newUser = await User.create({ name, email, password });

    return NextResponse.json(
      { success: true, insertedId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in registration:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
