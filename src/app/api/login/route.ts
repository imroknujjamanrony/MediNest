import { collection, getCollection } from "@/lib/getCollection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

//destructure the data from req body
//get the user collection
//find the user in the collection
//if user not found return 401
//compare the password using bcrypt

export async function POST(request: Request){
    try {
         const {email,password}=await request.json();
   const userCol=await getCollection(collection.user_collection);
   const user=await userCol.findOne({email});

   if(!user){
    return NextResponse.json({error:'invalid email or password'}, {status:401})
   }


   const comparePassword=await bcrypt.compare(password,user.password)
if(!comparePassword){
  return NextResponse.json({error:'invalid email or password'}, {status:401})
}

const {password:_,...userWithoutPassword}=user;
return NextResponse.json(userWithoutPassword)


    } catch (err) {
        console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
  
}