import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import Order from "@/models/Orders";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const session = await getServerSession(req);
    const { email } = session.user;
    if (!session)
      return NextResponse.json(
        { error: "Please enter into your account" },
        { status: 401 }
      );

    const user = await User.findOne({ email });

    const newOrder = new Order({ ...body, user: user._id });
    const order = await newOrder.save();

    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error in Saving to DB" },
      { status: 500 }
    );
  }
};
