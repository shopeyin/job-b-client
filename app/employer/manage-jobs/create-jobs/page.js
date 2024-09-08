import { auth } from "@/auth";
import CreateJobForm from "@/components/ui/CreateJobForm";

async function CreateJobs() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <CreateJobForm token={user.token} />
    </>
  );
}

export default CreateJobs;
