import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectToMongoDB } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Computer Science and Engineering (SMIT)",
  description:
    "Home Page of Computer Science and Engineering department (SMIT)[Sikkim Manipal Insititute of Technology]",
  creator: "Sudarshan Rai",
  keywords:
    "SMIT, Sikkim Manipal Institute of Technoloty, CSE, Computer Science and Engineering, Department, Computer Science, Engineering, Sikkim",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
