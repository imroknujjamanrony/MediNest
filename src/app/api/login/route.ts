/* eslint-disable @typescript-eslint/no-unused-vars */


// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { getCollection, collection } from "@/lib/getCollection";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//     }

//     const users = await getCollection(collection.user_collection);
//     const user = await users.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // Remove sensitive fields
//     const { password: _pw, ...safeUser } = user;

//     return NextResponse.json({
//       ...safeUser,
//       _id: user._id.toString(),
//     });
//   } catch (error) {
//     console.error("❌ Login API error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


//mongoose system diye kora hocche jemonta register api ta kora hoiche 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user";
import { UserType } from "@/types/user";


export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "You have to provide email and password" },
        { status: 400 }
      );
    }

    // Use .lean<UserType>() for type safety
    const user = await User.findOne({ email }).lean<UserType>();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Wrong password" },
        { status: 401 }
      );
    }

    // Remove password before sending the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

