import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import SignInPage from "@/templates/SignInPage";

const SignIn = async () => {
  // ========= Session ==========
  const session = await getServerSession(authOptions);
  if (session) redirect("/signin");

  // ========= Rendering ==========
  return <SignInPage />;
};

export default SignIn;
