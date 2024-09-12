import ApplicationForm from "@/components/ui/ApplicationForm";

import { getJob } from "@/lib/api";
async function Apply({ params }) {
  const { data, status, results } = await getJob(params.id);
  const { title } = data.job;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Apply for {title}
      </h1>

      <ApplicationForm id={params.id} />
    </div>
  );
}

export default Apply;
