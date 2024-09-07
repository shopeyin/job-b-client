import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function Admin() {
  const session = await auth();

  const user = session?.user;
  if (user?.role !== "admin") {
    redirect("/");
  }
  return <div>Admin</div>;
}

export default Admin;
