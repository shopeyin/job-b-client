import { auth } from "@/auth";
import ProfileForm from "@/components/ui/ProfileForm";
import { getUser } from "@/lib/api";

async function Profile() {
  const session = await auth();
  const user = session?.user;
  const data = await getUser(user?.id);
  console.log(data.data.user.savedJobs);
  return (
    <div>
      <ProfileForm token={user?.token} data={data?.data?.user} />
    </div>
  );
}

export default Profile;
