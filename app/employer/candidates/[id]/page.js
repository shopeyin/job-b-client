import { auth } from "@/auth";
import Chat from "@/components/ui/Chat";
import { getUser } from "@/lib/api";
async function SingleCandidate({ params }) {
  const session = await auth();
  const user = session?.user;
  const data = await getUser(params.id);
  const candidate = data?.data?.user;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
      <h1 className="text-3xl font-bold text-dark-blue">{candidate.name}</h1>

      <div className="mt-4">
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {candidate.email}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold">Role:</span> {candidate.role}
        </p>
      </div>

      {candidate.education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-dark-blue">Education</h2>
          <ul className="mt-2 space-y-2">
            {candidate.education.map((edu) => (
              <li key={edu._id} className="bg-light-blue p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-gray-600">
                  {edu.degree} in {edu.fieldOfStudy} (
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.current
                    ? "Present"
                    : new Date(edu.endDate).getFullYear()}
                  )
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {candidate.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-dark-blue">Skills</h2>
          <ul className="flex flex-wrap gap-2 mt-2">
            {candidate.skills.map((skill, idx) => (
              <li
                key={idx}
                className="bg-teal text-white px-3 py-1 rounded-full"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {candidate.workExperience.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-dark-blue">
            Work Experience
          </h2>
          <ul className="mt-2 space-y-4">
            {candidate.workExperience.map((exp) => (
              <li key={exp._id} className="p-4 bg-orange rounded-lg">
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <p className="text-gray-600">
                  {exp.title} ({new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.current
                    ? "Present"
                    : new Date(exp.endDate).getFullYear()}
                  )
                </p>
                <p className="mt-2">{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <a
          href={candidate.resume}
          target="_blank"
          className="text-teal hover:underline font-medium"
        >
          View Resume
        </a>
      </div>

      {/* Chat Section */}
      <div className="mt-8 flex flex-col items-start">
        <h2 className="text-2xl font-semibold text-dark-blue">
          Contact Candidate
        </h2>
              <Chat candidate={candidate} token={user?.token} />
      </div>
    </div>
  );
}

export default SingleCandidate;
