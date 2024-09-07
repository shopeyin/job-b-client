import { auth } from "@/auth";
import LoginForm from "@/components/ui/LoginForm";
import { redirect } from "next/navigation";

async function Login() {
  const session = await auth();

  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return <LoginForm />;
}

export default Login;
