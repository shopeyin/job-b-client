"use server";

import { auth, signIn } from "@/auth";
import axios from "axios";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { BASE_URL } from "./api";
import { revalidatePath } from "next/cache";

export async function authenticate(prevState, formData) {
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
    response = await axios.post(
      "http://localhost:3000/api/v1/users/signup",
      rawFormData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
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

export async function UpdateProfileFormAction(formData, token) {
  try {
    let response = await axios.patch(
      `http://localhost:3000/api/v1/users/updateMe`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {}

  revalidatePath("/profile");
}

export async function saveJob(jobId) {
  const session = await auth();
  const user = session?.user;

  try {
    let response = await axios.post(
      `http://localhost:3000/api/v1/savejobs`,
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
    const data = await response.data;
  } catch (error) {}

  // revalidatePath("/profile");
}

export async function sendJobApplication(jobId, formData) {
  const session = await auth();
  const user = session?.user;

  const rawFormData = {
    resume: formData.get("resume"),
    cover_letter: formData.get("coverLetter"),
  };
  try {
    let response = await axios.post(
      `http://localhost:3000/api/v1/jobs/${jobId}/applications`,
      rawFormData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      }
    );
    const data = await response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }

  // revalidatePath("/profile");
}

export async function createJobEndpoint(prevState, formData) {
  const rawFormData = {
    name: formData.get("name"),
  };

  try {
    response = await axios.post(
      "http://localhost:3000/api/v1/users/signup",
      rawFormData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
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
    const data = await response.data;
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

  revalidatePath("/applications/[id]");
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
