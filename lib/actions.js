"use server";

import { auth, signIn, signOut } from "@/auth";
import axios from "axios";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { BASE_URL } from "./api";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  applicationFormSchema,
  loginFormSchema,
  signUpFormSchema,
  resetFormSchema,
  forgetPasswordFormSchema,
} from "./validationSchema";
import { uploadFile } from "./utils";



export async function LoginAction(formState, formData) {
  let rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  let result = loginFormSchema.safeParse(rawFormData);

  if (!result.success) {
    return {
      fieldData: { email: rawFormData.email },
      errors: result.error.flatten().fieldErrors,
    };
  }
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
          return {
            fieldData: { email: rawFormData.email },
            errors: { err: "Invalid credentials" },
          };
        case "CallbackRouteError":
          return {
            fieldData: { email: rawFormData.email },
            errors: { err: "Invalid credentials" },
          };
        default:
          return {
            fieldData: { email: rawFormData.email },
            errors: { err: "Something went wrong" },
          };
      }
    }
    throw error;
  }
}

export async function createUserAction(prevState, formData) {
  const session = await auth();
  const user = session?.user;
  let response;
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    role: formData.get("role"),
  };

  try {
    response = await axios.post(`${BASE_URL}/users`, rawFormData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function SignupAction(formState, formData) {
  let user;
  let response;
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    role: formData.get("role"),
  };

  let result = signUpFormSchema.safeParse(rawFormData);
  if (!result.success) {
    // console.log(result.error.flatten().fieldErrors, formState);
    return {
      fieldData: {
        name: rawFormData.name,
        email: rawFormData.email,
        role: rawFormData.role,
      },
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    response = await axios.post(`${BASE_URL}/users/signup`, rawFormData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    return {
      fieldData: {
        name: rawFormData.name,
        email: rawFormData.email,
        role: rawFormData.role,
      },
      errors: { err: error.response.data.message },
    };
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

export async function ForgotPasswordAction(formState, formData) {
  const rawFormData = {
    email: formData.get("email"),
  };

  let result = forgetPasswordFormSchema.safeParse(rawFormData);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors, formState);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await axios.post(
      `${BASE_URL}/users/forgotPassword`,
      rawFormData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return {
      fieldData: {
        message: response.data.message,
      },
    };
  } catch (error) {
    return {
      fieldData: {
        message: error.response.data.message,
      },
    };
  }
}

export async function ResetPasswordAction(token, formState, formData) {
  let user;
  let response;

  const rawFormData = {
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  let result = resetFormSchema.safeParse(rawFormData);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors, formState);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    response = await axios.patch(
      `${BASE_URL}/users/resetPassword/${token}`,
      rawFormData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return {
      fieldData: {
        message: error.response.data.message,
      },
    };
  }
  user = await response?.data?.data;

  const signInResponse = await signIn("credentials", {
    redirectTo: "/",
    redirect: true,
    email: user.user.email,
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
  } catch (error) {
    return "Error Deleting";
  }

  return "Succesfully Deleted";
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

    return data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Unknown error occurred";

      return errorMessage;
    }
  }
}

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

  for (let [key, value] of Object.entries(formDataObject)) {
    if (key.toLowerCase().startsWith("requirement")) {
      requirements.push(value);
    } else if (key === "salaryMin" || key === "salaryMax") {
      continue;
    } else {
      newFormData[key] = value;
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

    // fieldData: {
    //   name: rawFormData.name,
    //   email: rawFormData.email,
    //   role: rawFormData.role,
    // },
  } catch (error) {
    if (error.response) {
      // Extract and log the specific error message
      const errorMessage =
        error.response.data.message || "Unknown error occurred";
      console.log(newFormData);
      return {
        fieldData: {
          title: newFormData?.title,
          description: newFormData?.description,
          location: newFormData?.location,
          industry: newFormData?.industry,
          closing_date: newFormData?.closing_date,
          requirements: newFormData?.requirements,
          work_arrangement: newFormData?.work_arrangement,
          contract_type: newFormData?.contract_type,
        },
        message: errorMessage,
      };
    }
  }

  revalidatePath("/");
  redirect("/employer/manage-jobs");
};

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
  }

  return error;
}

export async function sendJobApplication(jobId, formState, formData) {
  const session = await auth();
  const user = session?.user;

  const rawFormData = {
    cover_letter: formData.get("coverLetter"),
  };

  rawFormData.resume = formData.get("resume").name;

  //Validate with Zod Schema
  let result = applicationFormSchema.safeParse(rawFormData);
  if (!result.success) {
    return {
      fieldData: {
        cover_letter: rawFormData.cover_letter,
        resume: rawFormData.resume,
      },
      errors: result.error.flatten().fieldErrors,
    };
  }

  // INSERT INTO AWS
  let file = formData.get("resume");
  let type = file.name.split(".");

  const allowedTypes = ["pdf", "doc", "docx"];
  const maxSize = 1024 * 1024 * 10;

  if (!allowedTypes.includes(type[1] || file.size > maxSize)) {
    return {
      fieldData: {
        resume: rawFormData.resume,
        cover_letter: rawFormData.cover_letter,
      },
      errors: { err: "Upload acceptable size or file" },
    };
  }

  let filename;
  try {
    filename = await uploadFile(file, user.id);
  } catch (error) {
    return {
      fieldData: {
        resume: rawFormData.resume,
        cover_letter: rawFormData.cover_letter,
      },
      errors: { err: "Error uploding, try again.." },
    };
  }

  // INSERT INTO DATABASE
  const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${filename}`;
  rawFormData.resume = fileUrl;

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
    revalidatePath("/my-applications");
    revalidatePath("/employer/manage-jobs/applications/[id]", "page");

    // return {
    //   fieldData: {
    //     message: "Application successful",
    //   },
    // };
  } catch (error) {
    return {
      fieldData: {
        resume: rawFormData.resume,
        cover_letter: rawFormData.cover_letter,
      },
      errors: { err: "Something went wrong" },
    };
  }

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
    
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
    
      console.error("Error request:", error.request);
    } else {
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
  } catch (error) {}

  revalidatePath("/manage-jobs");
}

export async function deleteMyAccount() {
  const session = await auth();
  const user = session?.user;

  try {
    await axios.delete(`${BASE_URL}/users/deleteMe`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      withCredentials: true,
    });
  } catch (error) {}

  await signOut({
    redirect: true,
    redirectTo: "/signup",
  });
}

// export async function updateCompanyAction(id, prevState, formData) {
//   console.log("UPDATE COMPANY CALLED");
//   const session = await auth();
//   const user = session?.user;
//   const rawFormData = {
//     name: formData.get("name"),
//     location: formData.get("location"),
//     website: formData.get("website"),
//     description: formData.get("description"),
//   };
//   rawFormData.logo = formData.get("logo").name;

//   // INSERT INTO AWS
//   let file = formData.get("logo");
//   let type = file.name.split(".");

//   console.log(file, "FILE HERE");
//   const allowedTypes = ["jpg", "jpeg", "png", "webp"];
//   const maxSize = 1024 * 1024 * 10;

//   if (!allowedTypes.includes(type[1] || file.size > maxSize)) {
//     return {
//       fieldData: {
//         name: rawFormData.name,
//         location: rawFormData.location,
//         website: rawFormData.website,
//         description: rawFormData.description,
//       },
//       errors: { err: "Upload acceptable size or file" },
//     };
//   }

//   let filename;
//   try {
//     filename = await uploadFile(file, user.id);
//   } catch (error) {
//     return {
//       fieldData: {
//         name: rawFormData.name,
//         location: rawFormData.location,
//         website: rawFormData.website,
//         description: rawFormData.description,
//       },
//       errors: { err: "Error uploding, try again.." },
//     };
//   }

//   // INSERT INTO DATABASE
//   const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${filename}`;
//   rawFormData.logo = fileUrl;

//   try {
//     let response = await axios.patch(
//       `${BASE_URL}/companies/${id}`,
//       rawFormData,
//       {
//         headers: {
//           "Content-Type": "application/json",

//           Authorization: `Bearer ${user.token}`,
//         },
//         withCredentials: true,
//       }
//     );
//     // console.log(response, "RESPONSE");
//     revalidatePath("/employer");
//     return {
//       fieldData: {
//         message: "Company Updated",
//       },
//     };
//   } catch (error) {
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       console.error("Error response:", error.response.data);
//       console.error("Error status:", error.response.status);
//     } else if (error.request) {
//       // Request was made but no response was received
//       console.error("Error request:", error.request);
//     } else {
//       // Something happened in setting up the request
//       console.error("Error message:", error.message);
//     }

//     console.error("Error config:", error.config);
//   }

//   // revalidatePath("/applications/[id]",'page');
// }
export async function updateCompanyAction(id, prevState, formData) {
  console.log("UPDATE COMPANY CALLED");
  const session = await auth();
  const user = session?.user;
  const rawFormData = {
    name: formData.get("name"),
    location: formData.get("location"),
    website: formData.get("website"),
    description: formData.get("description"),
  };

  let file = formData.get("logo"); // Get the file from the form

  if (file && file.size > 0) {
    // Only process the file if it exists and has a size greater than 0
    let type = file.name.split(".");

    console.log(file, "FILE HERE");
    const allowedTypes = ["jpg", "jpeg", "png", "webp"];
    const maxSize = 1024 * 1024 * 10;

    // Check for valid file type and size
    if (!allowedTypes.includes(type[1]) || file.size > maxSize) {
      return {
        fieldData: {
          name: rawFormData.name,
          location: rawFormData.location,
          website: rawFormData.website,
          description: rawFormData.description,
        },
        errors: { err: "Upload acceptable size or file" },
      };
    }

    // Try to upload the file
    let filename;
    try {
      filename = await uploadFile(file, user.id); // Assuming you have an `uploadFile` function
    } catch (error) {
      return {
        fieldData: {
          name: rawFormData.name,
          location: rawFormData.location,
          website: rawFormData.website,
          description: rawFormData.description,
        },
        errors: { err: "Error uploading, try again." },
      };
    }

    // Construct file URL after upload
    const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${filename}`;
    rawFormData.logo = fileUrl;
  } else {
    // If no file is provided, retain the previous logo (or handle no logo scenario)
    rawFormData.logo = prevState?.logo; // Assume `prevState` contains the previous logo URL
  }

  // Submit the form data to the backend
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

    // Invalidate cache or revalidate path if necessary
    console.log(response, "SUCCESS");
    revalidatePath("/employer");
    return {
      fieldData: {
        message: "Company Updated",
      },
    };
  } catch (error) {
    console.log(error, "ERROR");
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    console.error("Error config:", error.config);
    return {
      fieldData: {
        name: rawFormData.name,
        location: rawFormData.location,
        website: rawFormData.website,
        description: rawFormData.description,
      },
      errors: { err: "Error updating company, try again." },
    };
  }
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
