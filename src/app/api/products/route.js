import Product from "@/models/Products";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error in Saving to DB" },
      { status: 500 }
    );
  }
};
