"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // redirect("/login");
  }
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>{JSON.stringify(session)}</nav>
      {children}
    </section>
  );
}
