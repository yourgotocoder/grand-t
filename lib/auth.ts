import { connectToMongoDB } from "./db";
import User from "../models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  user_unique_id: number;
  // other properties
}

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        user_unique_id: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMongoDB();
        const userDocument = await User.findOne({
          user_unique_id: credentials?.user_unique_id,
        }).select("+password");

        if (!userDocument) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userDocument.password,
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        // Transform the user document into the expected User type
        const user: User = {
          id: userDocument._id.toString(),
          user_unique_id: userDocument.user_unique_id,
          // map other properties if needed
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
