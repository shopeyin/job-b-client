"use client";
import React, { useState } from "react";
import { UpdateProfileFormAction } from "@/lib/actions";
import { Toaster, toast } from "sonner";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import DeleteMe from "./DeleteMe";

function ProfileForm({ data, token }) {
  console.log(data);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    skills: data?.skills || [""],
    workExperience: data?.workExperience || [
      {
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: data?.education || [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        current: false,
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, key, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];

    if (arrayName === "skills") {
      updatedArray[index] = value;
    } else {
      updatedArray[index] = { ...updatedArray[index], [key]: value };
    }

    if (key === "current" && value) {
      updatedArray[index] = { ...updatedArray[index], endDate: null };
    }

    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const addArrayField = (arrayName, emptyField) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], emptyField],
    });
  };

  const removeArrayField = (index, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    // Submit form data using the action
    console.log(formData);
    await UpdateProfileFormAction(formData, token);
    setIsPending(false);

    toast.success("Profile updated successfully!", {
      position: "top-center",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleArrayChange(index, null, e.target.value, "skills")
                  }
                  className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "skills")}
                  className="px-3 py-1 text-sm bg-orange text-white rounded hover:bg-dark-gray"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("skills", "")}
              className="mt-3 px-4 py-2 bg-teal text-white rounded hover:bg-dark-blue"
            >
              Add Skill
            </button>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Work Experience
            </h2>
            {formData.workExperience.map((experience, index) => (
              <div
                key={index}
                className="p-4 mt-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formatDateToYYYYMMDD(experience.startDate)}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "startDate",
                          e.target.value,
                          "workExperience"
                        )
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current
                    </label>
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
                      className="mt-1"
                    />
                  </div>
                  {!experience.current && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formatDateToYYYYMMDD(experience?.endDate)}
                      
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "endDate",
                            e.target.value,
                            "workExperience"
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
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
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "workExperience")}
                  className="mt-3 px-4 py-2 bg-orange text-white rounded hover:bg-dark-gray"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayField("workExperience", {
                  company: "",
                  title: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
                })
              }
              className="mt-3 px-4 py-2 bg-teal text-white rounded hover:bg-dark-blue"
            >
              Add Experience
            </button>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Education</h2>
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="p-4 mt-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formatDateToYYYYMMDD(edu.startDate)}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "startDate",
                          e.target.value,
                          "education"
                        )
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current
                    </label>
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "current",
                          e.target.checked,
                          "education"
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                  {!edu.current && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formatDateToYYYYMMDD(edu?.endDate)}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "endDate",
                            e.target.value,
                            "education"
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "education")}
                  className="mt-3 px-4 py-2 bg-orange text-white rounded hover:bg-dark-gray"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayField("education", {
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                })
              }
              className="mt-3 px-4 py-2 bg-teal text-white rounded hover:bg-dark-blue"
            >
              Add Education
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 bg-teal text-white rounded hover:bg-dark-blue disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-8">
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800">
            Delete My Account
          </h2>
          <p className="mt-2 text-sm text-red-700">
            This action is irreversible. Deleting your account will permanently
            remove all your data. If you are sure you want to proceed, click the
            button below.
          </p>
          <DeleteMe />
          {/* <button
            type="button"
            onClick={handleDeleteAccount}
            className="mt-4 px-4 py-2 bg-orange text-white rounded hover:bg-dark-gray"
          >
            Delete Account
          </button> */}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default ProfileForm;
