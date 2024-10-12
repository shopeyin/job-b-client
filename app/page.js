import { fetchJobs } from "../lib/api";
import Search from "@/components/ui/Search";
import Link from "next/link";

export const revalidate = 0;

export default async function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const queryString = params.toString();
  const data = await fetchJobs(queryString);

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row rounded justify-center items-start sm:items-center py-4 sm:py-6 border-b border-gray-200 bg-dark-blue text-white">
          <h1 className="text-3xl sm:text-4xl font-bold">Job Board</h1>
        </header>

        <div className="mt-6 sm:mt-8">
          <Search totalPages={data.totalPages} />
          <p className="text-gray-700 mt-2 text-sm sm:text-base">
            {data.results} results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {data?.data?.jobs.map((item) => (
              <div
                key={item?._id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <Link
                  href={`/${item?._id}`}
                  className="text-xl sm:text-2xl font-semibold text-dark-blue hover:text-teal transition-colors"
                >
                  {item?.title}
                </Link>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm">
                  {item?.location}
                </p>
                <p className="text-dark-gray mt-1 text-sm sm:text-lg font-medium">
                  ${item?.salary?.min?.toLocaleString()} - $
                  {item?.salary?.max?.toLocaleString()} per year
                </p>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                  {item?.company?.name}
                </p>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm font-light">
                  {item?.contract_type}
                </p>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm font-light">
                  {item?.work_arrangement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
