import { NextResponse } from "next/server";
import connectDB from "@/MongoDB/db";
import User, { IUser } from "@/MongoDB/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure MongoDB connection

    const { email, password } = await req.json();

    // Correctly type the user
    //@ts-ignore
    const user: IUser | null = await User.findOne({ email }).lean();
    console.log("User in POST:",user)
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token, role: user.role }, { status: 200 });
  } catch (error) {
    console.error("Signin Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
