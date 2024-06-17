import ShippingPage from "@/templates/ShippingPage";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Shipping = async () => {
  // ============= Session ===========
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  // ============= Rendering ===========
  return <ShippingPage />;
};

export default Shipping;
