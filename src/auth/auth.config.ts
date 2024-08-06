import { connectToMongoDB } from "@/lib/db";
import User from "@/models/User";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
interface User {
  id: string;
  // user_unique_id: number;
  // other properties
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is authenticated
      const isLoggedIn = !!auth?.user;
      // Initialize protected routes
      // Here, all routes except the login page is protected
      const isOnProtected = !nextUrl.pathname.startsWith("/login");

      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // redirect to /login
      } else if (isLoggedIn) {
        // redirected to homepage
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
