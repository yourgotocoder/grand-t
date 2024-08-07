import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton.server";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1 className="text-3xl font-bold">Home Page</h1>
      <pre>{JSON.stringify(session)}</pre>
      <AuthButton></AuthButton>
    </main>
  );
}
