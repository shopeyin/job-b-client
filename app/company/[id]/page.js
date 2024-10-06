import { getCompany } from "@/lib/api";

async function Company({ params: { id } }) {
  let data = await getCompany(id);
  const company = data?.company || {};
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex items-center space-x-4">
          <img
            src={
              company.logo ? `${company.logo}` : "/images/default.jpg"
            } // Fallback image
            alt={`${company.name || "Company Logo"}`}
            className="w-16 h-16 object-cover rounded-full shadow-md"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-dark-blue">
              {company.name || "Company Name"}
            </h1>
            <p className="text-lg text-gray-600">
              {company.email || "Email not available"}
            </p>
            <p className="text-md text-gray-500 mt-2">
              {company.location || "Location not available"}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-dark-blue">About Us</h2>
          <p className="text-gray-700 mt-4">
            {/* You can include additional details or description here if available */}
            {company.description || "No description available."}
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default Company;
