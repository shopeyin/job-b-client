import { fetchJobs } from "../lib/api";
import Search from "@/components/ui/Search";
import Link from "next/link";

export default async function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const queryString = params.toString();
  const data = await fetchJobs(queryString);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold text-gray-800">Job-board</h1>
        </header>

        <div className="mt-8">
          <Search />
          <h1>{data.results} results</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data?.data?.jobs.map((item) => (
              <div
                key={item?._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/${item?._id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {item?.title}
                </Link>
                <p className="text-gray-600 mt-2">{item?.location}</p>
                <p className="text-gray-600 mt-1">
                  ${item?.salary?.min?.toLocaleString()} - $
                  {item?.salary?.max?.toLocaleString()} per year
                </p>
                <p className="text-gray-600 mt-1">{item?.company?.name}</p>
                <p className="text-gray-600 mt-1">{item?.contract_type}</p>
                <p className="text-gray-600 mt-1">{item?.work_arrangement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
