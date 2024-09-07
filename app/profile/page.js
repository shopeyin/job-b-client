import { auth } from "@/auth";
import ProfileForm from "@/components/ui/ProfileForm";
import { getUser } from "@/lib/api";
import { cookies } from "next/headers";

async function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const session = await auth();
  const user = session?.user;
  const  data  = await getUser(user?.id);
 console.log(data.data.user)
  return (
    <div>
      <ProfileForm token={user?.token} data={data?.data?.user} />
    </div>
  );
}

export default Profile;
