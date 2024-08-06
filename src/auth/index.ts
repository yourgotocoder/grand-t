import { connectToMongoDB } from "@/lib/db";

import User from "@/models/User";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentails from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const BASE_PATH = "/api/auth";

const { AUTH_SECRET } = process.env;

if (!AUTH_SECRET) throw new Error("Auth Secret environmnet varialble not set");

const authOptions: NextAuthConfig = {
  providers: [
    Credentails({
      name: "Credentials",
      id: "credentials",
      credentials: {
        user_id: { label: "Username", type: "text", placeholder: "USERID" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMongoDB();
        const user = await User.findOne({
          user_unique_id: credentials?.user_id,
        }).select("+password");

        if (!user) {
          throw new Error("User does not exists");
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password as string,
          user.password,
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        return { ...user, role: user.role ?? "student" };
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token) {
        await connectToMongoDB();
        const foundUser = await User.findById({
          _id: token.sub,
        });
        session.user.userId = foundUser!._id.toString();
        session.user.role = foundUser!.role ?? "student";
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
