import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Employer() {
  const session = await auth();

  const user = session?.user;
  if (user?.role !== "employer") {
    redirect("/");
  }
  return <div>Employer</div>;
}

export default Employer;
