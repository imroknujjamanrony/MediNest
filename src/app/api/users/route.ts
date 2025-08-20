import { dbConnect } from "@/lib/dbConnect"
import { collection, getCollection } from "@/lib/getCollection"
import { User } from "@/models/user"

import { NextResponse } from "next/server"

export async function GET() {
    try {
       await dbConnect()
        const users=await User.find()
        return NextResponse.json(users)
       
    } catch (error) {
      console.log('error', error)  
    }
}