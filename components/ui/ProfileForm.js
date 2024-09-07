// "use client";
// import { UpdateProfileFormAction } from "@/lib/actions";
// import { useActionState, useState } from "react";

// function ProfileForm({ data, token }) {
//   const [errorMessage, formAction, isPending] = useActionState(
//     UpdateProfileFormAction,
//     undefined
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>
//         <form
//           action={formAction}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         >
//           <input type="hidden" name="token" value={token} />
//           {/* Personal Information */}
//           <div className="col-span-1">
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 defaultValue={data.name}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           {/* Skills
//           <div className="col-span-1">
//             <label className="block text-gray-700 font-semibold mb-2">
//               Skills
//             </label>
//             {formData.skills.map((skill, index) => (
//               <div key={index} className="flex items-center mb-4">
//                 <input
//                   type="text"
//                   value={skill}
//                   onChange={(e) =>
//                     handleArrayChange(index, null, e.target.value, "skills")
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//             ))}
//           </div>

//           Work Experience
//           <div className="col-span-1 md:col-span-2">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               Work Experience
//             </h2>
//             {formData.workExperience.map((experience, index) => (
//               <div key={index} className="mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Company
//                     </label>
//                     <input
//                       type="text"
//                       value={experience.company}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "company",
//                           e.target.value,
//                           "workExperience"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       value={experience.title}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "title",
//                           e.target.value,
//                           "workExperience"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       value={experience.startDate}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "startDate",
//                           e.target.value,
//                           "workExperience"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       value={experience.endDate}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "endDate",
//                           e.target.value,
//                           "workExperience"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>
//                 <label className="block text-gray-700 font-semibold mb-2 mt-4">
//                   Description
//                 </label>
//                 <textarea
//                   value={experience.description}
//                   onChange={(e) =>
//                     handleArrayChange(
//                       index,
//                       "description",
//                       e.target.value,
//                       "workExperience"
//                     )
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//             ))}
//           </div>

//           Education
//           <div className="col-span-1 md:col-span-2">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Education</h2>
//             {formData.education.map((edu, index) => (
//               <div key={index} className="mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Institution
//                     </label>
//                     <input
//                       type="text"
//                       value={edu.institution}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "institution",
//                           e.target.value,
//                           "education"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Degree
//                     </label>
//                     <input
//                       type="text"
//                       value={edu.degree}
//                       onChange={(e) =>
//                         handleArrayChange(index, "degree", e.target.value, "education")
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Field of Study
//                     </label>
//                     <input
//                       type="text"
//                       value={edu.fieldOfStudy}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "fieldOfStudy",
//                           e.target.value,
//                           "education"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       value={edu.startDate}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "startDate",
//                           e.target.value,
//                           "education"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-semibold mb-2">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       value={edu.endDate}
//                       onChange={(e) =>
//                         handleArrayChange(
//                           index,
//                           "endDate",
//                           e.target.value,
//                           "education"
//                         )
//                       }
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>
//                 <label className="block text-gray-700 font-semibold mb-2 mt-4">
//                   Description
//                 </label>
//                 <textarea
//                   value={edu.description}
//                   onChange={(e) =>
//                     handleArrayChange(
//                       index,
//                       "description",
//                       e.target.value,
//                       "education"
//                     )
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//             ))}
//           </div> */}

//           <div className="col-span-1 md:col-span-2 text-right">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
//             >
//               Update Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;

"use client";
import { UpdateProfileFormAction } from "@/lib/actions";
import React, { useState } from "react";

function ProfileForm({ data, token }) {
  // State for form data
  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
    skills: data.skills,
    workExperience: data.workExperience,
    education: data.education,
  });

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array changes (for skills, workExperience, education)
  const handleArrayChange = (index, field, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Add new skill field
  const addSkillField = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  // Remove a skill field
  const removeSkillField = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  // Add new work experience field
  const addWorkExperienceField = () => {
    const newWorkExperience = {
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false, // Added field for the 'current' status
    };
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, newWorkExperience],
    });
  };

  // Remove work experience field
  const removeWorkExperienceField = (index) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience.splice(index, 1);
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  // Add new education field
  const addEducationField = () => {
    const newEducation = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setFormData({
      ...formData,
      education: [...formData.education, newEducation],
    });
  };

  // Remove education field
  const removeEducationField = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  // Handle form submission (placeholder function)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await UpdateProfileFormAction(formData, token);
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <input type="hidden" name="token" value={token} />

          {/* Name Field */}
          <div className="col-span-1">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="text"
                name="name"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Skills Field */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Skills
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleArrayChange(index, null, e.target.value, "skills")
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeSkillField(index)}
                  className="ml-2 bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkillField}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>

          {/* Work Experience Field */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Work Experience
            </h2>
            {formData.workExperience.map((experience, index) => (
              <div key={index} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "company",
                          e.target.value,
                          "workExperience"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "title",
                          e.target.value,
                          "workExperience"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "startDate",
                          e.target.value,
                          "workExperience"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Check if "current" is checked, if true, hide End Date */}
                  {!experience.current && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "endDate",
                            e.target.value,
                            "workExperience"
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
                {/* Checkbox for "Current Job" */}
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "current",
                          e.target.checked,
                          "workExperience"
                        )
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Current Job</span>
                  </label>
                </div>
                <label className="block text-gray-700 font-semibold mb-2 mt-4">
                  Role Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "description",
                      e.target.value,
                      "workExperience"
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeWorkExperienceField(index)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Remove Work Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkExperienceField}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Work Experience
            </button>
          </div>

          {/* Education Field */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Education
            </h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "institution",
                          e.target.value,
                          "education"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "degree",
                          e.target.value,
                          "education"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "fieldOfStudy",
                          e.target.value,
                          "education"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "startDate",
                          e.target.value,
                          "education"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "endDate",
                          e.target.value,
                          "education"
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <label className="block text-gray-700 font-semibold mb-2 mt-4">
                  Description
                </label>
                <textarea
                  value={edu.description}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "description",
                      e.target.value,
                      "education"
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeEducationField(index)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducationField}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Education
            </button>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
