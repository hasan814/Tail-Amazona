import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    await connectDB();

    const session = await getServerSession({ req });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password } = await req.json();
    if (
      !name ||
      !email ||
      !email.includes("@") ||
      (password && password.trim().length < 3)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const toUpdateUser = await User.findOne({ email: session.user.email });
    if (!toUpdateUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    toUpdateUser.name = name;
    toUpdateUser.email = email;
    if (password) {
      toUpdateUser.password = await hashPassword(password);
    }

    await toUpdateUser.save();

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error in connecting to the database" },
      { status: 500 }
    );
  }
};
