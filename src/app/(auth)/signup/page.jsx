import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import SignUpPage from "@/templates/SignUpPage";

const SignUp = async () => {
  // ============ Session ==========
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  // ============ Rendering ==========
  return <SignUpPage />;
};

export default SignUp;
