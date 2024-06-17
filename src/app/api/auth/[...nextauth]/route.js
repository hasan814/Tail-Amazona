import { verifyPassword } from "@/utils/auth";

import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import User from "@/models/User";

export const authOptions = {
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password, name } = credentials;
        try {
          await connectDB();
        } catch (error) {
          console.error("Error connecting to DB", error);
          throw new Error("Error in Connecting to DB");
        }
        if (!email || !password) throw new Error("Please enter an Valid data");

        const user = await User.findOne({ email });
        if (!user) throw new Error("Please Make an account!");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Wrong password or email");

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
  pages: {
    signin: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
