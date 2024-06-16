import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();

    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Invalid Data!" }, { status: 422 });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { error: "this account is already exist" },
        { status: 422 }
      );

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "Created Account!" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error in Connecting to DB" },
      { status: 500 }
    );
  }
};
