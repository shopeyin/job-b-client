"use client";
import React, { useState } from "react";
import { UpdateProfileFormAction } from "@/lib/actions";
import { Toaster, toast } from "sonner";
import { formatDateToYYYYMMDD } from "@/lib/utils";

function ProfileForm({ data, token }) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name || "",
    email: data.email || "",
    skills: data.skills || [""],
    workExperience: data.workExperience || [
      {
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: data.education || [
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

  const addSkillField = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeSkillField = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const addWorkExperienceField = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const removeWorkExperienceField = (index) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience.splice(index, 1);
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const addEducationField = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
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
  };

  const removeEducationField = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    await UpdateProfileFormAction(formData, token);
    console.log("Form data submitted:", formData);
    setIsPending(false);
    toast.success("User updated", {
      position: "top-center",
      className: "bg-green-500",
      duration: 5000,
    });
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
                name="email"
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

          {/* Work Experience */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Work Experience
            </h2>
            <div>
              {formData.workExperience.map((experience, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm"
                >
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
                        value={formatDateToYYYYMMDD(experience.startDate)}
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
                    <div className="flex items-center">
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
                      />
                      <label className="ml-2">Current</label>
                    </div>
                    {!experience.current && (
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={experience.endDate || ""}
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
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
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
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWorkExperienceField(index)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addWorkExperienceField}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Experience
              </button>
            </div>
          </div>

          {/* Education */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Education
            </h2>
            <div>
              {formData.education.map((education, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={education.institution}
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
                        value={education.degree}
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
                        value={education.fieldOfStudy}
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
                        value={formatDateToYYYYMMDD(education.startDate)}
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
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={education.current}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "current",
                            e.target.checked,
                            "education"
                          )
                        }
                      />
                      <label className="ml-2">Current</label>
                    </div>
                    {!education.current && (
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={education.endDate || ""}
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
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEducationField(index)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
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
          </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default ProfileForm;
