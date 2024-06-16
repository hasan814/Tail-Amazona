import { verifyPassword } from "@/utils/auth";

import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import User from "@/models/User";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in Connecting to DB");
        }
        if (!email || !password) throw new Error("Please enter an Valid data");

        const user = await User.findOne({ email });
        if (!user) throw new Error("Please enter into your account");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Wrong password or email");

        return { email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
