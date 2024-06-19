import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import Order from "@/models/Orders";

export const GET = async (req) => {
  try {
    await connectDB();

    const session = await getServerSession({ req });
    if (!session)
      return NextResponse.json(
        { error: "Please enter into your account" },
        { status: 401 }
      );
    const { user } = session;
    const orders = await Order.find({ user: user._id });
    console.log(orders);
    if (!orders)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error In Connecting to DB" },
      { status: 500 }
    );
  }
};
