import Image from "next/image";
import Link from "next/link";
import { getJob } from "@/lib/api";


export default async function Job({ params }) {
  const { data, status, results } = await getJob(params.id);

  if (!data?.job) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-red-600">Job not found</h1>
        </div>
      </main>
    );
  }

  const {
    title,
    description,
    location,
    industry,
    work_arrangement,
    contract_type,
    salary,
    requirements,
    company,
    created_at,
  } = data.job;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{location}</p>
          <p className="text-gray-500">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Job Details
          </h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Industry</h3>
              <p className="text-gray-600">{industry}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Work Arrangement
              </h3>
              <p className="text-gray-600 capitalize">{work_arrangement}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Contract Type
              </h3>
              <p className="text-gray-600">{contract_type}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Salary</h3>
              <p className="text-gray-600">
                ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </section>

        <footer className="mt-6">
          <Link
            href={`/company/${company}`}
            className="text-blue-600 hover:underline"
          >
            View Company Profile
          </Link>
        </footer>
      </div>
    </main>
  );
}
