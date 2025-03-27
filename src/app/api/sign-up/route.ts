import connectDB from "@lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
export async function POST(req: Request){
  try{
    await connectDB();
    const { name,email,password,role } = await req.json();
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Missing required fields: name, email, or password!" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const hashedPassword = await bcrypt.hash(password,10)
    if (role === "ADMIN") {
      return new Response(JSON.stringify({ message: "Cannot register as admin" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    })

    await user.save();
    const userObject = user.toObject();
    delete userObject.password;
    return new Response(JSON.stringify({
      message: "New User Created successfully!",
      status: 201,
      user :userObject,
      headers: { "Content-Type": "application/json" }
    }))
  }catch(e){
    console.log(e)
    return new Response(JSON.stringify({
      message: "Error Signing up a new User",
      error: e,
      status: 500,
      headers: { "Content-Type": "application/json" },
    }))
  }
}