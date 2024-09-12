"use server";

import { auth, signIn } from "@/auth";
import axios from "axios";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { BASE_URL } from "./api";
import { revalidatePath, revalidateTag } from "next/cache";

export const createJobAction = async (prevState, formData) => {
  const session = await auth();
  const user = session?.user;
  const newFormData = {};
  const requirements = [];

  // Convert FormData to a plain object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Iterate over the plain object and extract requirement fields
  for (let [key, value] of Object.entries(formDataObject)) {
    if (key.toLowerCase().startsWith("requirement")) {
      requirements.push(value);
    } else if (key === "salaryMin" || key === "salaryMax") {
      // Skip salaryMin and salaryMax for now, handle them later
      continue;
    } else {
      newFormData[key] = value; // Keep other fields as they are
    }
  }

  newFormData.requirements = requirements;

  newFormData.salary = {
    min: Number(formDataObject.salaryMin),
    max: Number(formDataObject.salaryMax),
  };

  let response;
  try {
    response = await axios.post(`${BASE_URL}/jobs`, newFormData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    if (error.response) {
      // Extract and log the specific error message
      const errorMessage =
        error.response.data.message || "Unknown error occurred";

      return errorMessage;
    }
  }

  revalidatePath("/");
  redirect("/employer/manage-jobs");
};

export async function LoginAction(prevState, formData) {
  try {
    await signIn("credentials", {
      redirectTo: "/",
      redirect: true,
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        case "CallbackRouteError":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const handleValidationError = (err) => {
  const errors = {};

  // Iterate over the errors object and extract each error message
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
};

export async function SignupAction(prevState, formData) {
  let user;
  let response;
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    role: formData.get("role"),
  };

  try {
    response = await axios.post(`${BASE_URL}/users/signup`, rawFormData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    // console.log(error.response.data.error);
    let err = handleValidationError(error.response.data.error);
    const firstKey = Object.keys(err)[0];
    const firstValue = err[firstKey];
    console.log(firstValue);
    return firstValue;
  }

  // console.log(user, "SIGNUP");

  // if (!user) return;

  user = await response?.data?.data;

  const roleBasedRedirect =
    user?.user?.role === "job_seeker" ? "/profile" : `/${user?.user?.role}`;

  const signInResponse = await signIn("credentials", {
    redirectTo: roleBasedRedirect,
    redirect: true,
    email: rawFormData.email,
    password: rawFormData.password,
  });

  if (signInResponse?.error) {
    console.error("Error during sign-in:", signInResponse.error);
    return {
      message: "An error occurred during sign-in.",
    };
  }
}

export async function deleteUserAction(id, prevState, formData) {
  const session = await auth();
  const user = session?.user;
  try {
    await axios.delete(`${BASE_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    });
    revalidatePath("/admin/users");
    return "Succesfully Deleted";
  } catch (error) {
    console.log(error.response.data.message);
    return "Error Deleting";
  }
}

export async function UpdateUserAction(id, prevState, formData) {
  const session = await auth();
  const user = session?.user;
  try {
    const response = await axios.patch(`${BASE_URL}/users/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    });
    let { data } = response;

    revalidatePath("/admin/users");
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Unknown error occurred";

      return errorMessage;
    }
  }
}

export async function UpdateProfileFormAction(formData, token) {
  try {
    let response = await axios.patch(`${BASE_URL}/users/updateMe`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    revalidatePath("/profile");
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Unknown error occurred";

      return errorMessage;
    }
  }
}

export async function saveJob(jobId) {
  const session = await auth();
  const user = session?.user;

  let error;
  let data;
  try {
    data = await axios.post(
      `${BASE_URL}/savejobs`,
      {
        jobId: jobId,
        userId: user.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
    revalidatePath("/saved-jobs");
    return data.data;
  } catch (err) {
    error = err.response.data;
    console.log(error);
  }

  return error;
}

export async function unSaveJob(jobId) {
  const session = await auth();
  const user = session?.user;

  let error;
  let data;
  try {
    data = await axios.delete(
      `${BASE_URL}/savejobs/${jobId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
    revalidatePath("/saved-jobs");
    return data.data;
  } catch (err) {
    error = err.response.data;
    console.log(error);
  }

  return error;
}

export async function sendJobApplication(jobId, prevState, formData) {
  const session = await auth();
  const user = session?.user;

  const rawFormData = {
    resume: formData.get("resume"),
    cover_letter: formData.get("coverLetter"),
  };
  try {
    let response = await axios.post(
      `${BASE_URL}/jobs/${jobId}/applications`,
      rawFormData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
    // console.log(response);
  } catch (error) {
    return error.response.data.message;
  }

  revalidatePath("/my-applications");
  revalidatePath("/employer/manage-jobs/applications/[id]", "page");
  redirect("/my-applications");
}

export async function createJobEndpoint(prevState, formData) {
  const rawFormData = {
    name: formData.get("name"),
  };

  try {
    response = await axios.post(`${BASE_URL}/users/signup`, rawFormData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
    }

    console.error("Error config:", error.config);
  }
}

export async function deleteJob(formData) {
  const session = await auth();
  const user = session?.user;
  try {
    let response = await axios.delete(
      `${BASE_URL}/jobs/${formData.get("id")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error.response.data.message);
  }

  revalidatePath("/manage-jobs");
}

export async function updateCompanyAction(id, prevState, formData) {
  const session = await auth();
  const user = session?.user;
  const rawFormData = {
    name: formData.get("name"),
    location: formData.get("location"),
    website: formData.get("website"),
    description: formData.get("description"),
  };
  console.log(id);
  try {
    let response = await axios.patch(
      `${BASE_URL}/companies/${id}`,
      rawFormData,
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data.data);
    revalidatePath("/employer");
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
    }

    console.error("Error config:", error.config);
  }

  // revalidatePath("/applications/[id]",'page');
}

export async function updateApplicationStatus(
  jobId,
  applicationId,
  currentStatus
) {
  const session = await auth();
  const user = session?.user;

  const rawFormData = {
    status: currentStatus,
  };

  try {
    await axios.patch(
      `${BASE_URL}/jobs/${jobId}/applications/${applicationId}`,
      rawFormData,
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
    revalidatePath("employer/manage-jobs/applications/[id]", "page");
    revalidatePath("/my-applications");
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
    }

    console.error("Error config:", error.config);
  }
}
