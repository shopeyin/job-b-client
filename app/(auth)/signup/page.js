import { auth } from "@/auth";
import SignUpForm from "@/components/ui/SignUpForm";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await auth();

  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return (
    <>
      <SignUpForm />
    </>
  );
}
