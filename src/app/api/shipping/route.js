import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectDB from "@/utils/connectDB";
import Shipping from "@/models/Shipping";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDB();
    const { fullName, address, city, postalCode, country } = await req.json();
    const session = await getServerSession(req);
    const email = session.user.email;
    if (!session)
      return NextResponse.json(
        { error: "Please enter into Your Account" },
        { status: 401 }
      );

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User Dosent Exist" }, { status: 404 });
    if (!fullName || !address || !city || !postalCode || !country)
      return NextResponse.json({ error: "Invalid Data!" }, { status: 400 });
    await Shipping.create({
      fullName,
      address,
      city,
      postalCode,
      country,
      userId: new Types.ObjectId(user._id),
    });
    return NextResponse.json(
      { message: "Data Saved Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error in Connecting to DB" },
      { status: 500 }
    );
  }
};
