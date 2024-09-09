import { auth } from "@/auth";
import EditJobForm from "@/components/ui/EditJobForm";
import { getJob } from "@/lib/api";

async function EditJobs({ params: { id } }) {
  const session = await auth();
  const user = session?.user;
  const { data } = await getJob(id);

  return (
    <div>
      <EditJobForm data={data.job} token={user.token}/>
    </div>
  );
}

export default EditJobs;
