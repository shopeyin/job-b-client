import { auth, signIn } from "@/auth";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";

export const BASE_URL = "http://localhost:8000/api/v1";

export async function login(credentials) {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status is OK (200-299)
    if (!res.ok) {
      console.error("Login request failed with status:", res.status);
      return null; // Return null if the login fails
    }

    const data = await res.json();

    // Ensure the response contains the expected user object
    if (!data || !data.data || !data.data.user) {
      console.error("Unexpected response structure:", data);
      return null; // Return null if the user data is not found
    }

    return data.data.user; // Return the user object
  } catch (error) {
    console.error("An error occurred during login:", error);
    return null; // Return null in case of an error
  }
}

export async function fetchJobs(queryString) {
  let response = await fetch(
    `${BASE_URL}/jobs?${queryString}`,

    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  let data = await response.json();

  return data;
}

export async function fetchJobseekers(queryString) {
  console.log(queryString, "QUERYSTRING");
  let response = await fetch(
    `${BASE_URL}/users/jobSeekers?${queryString}`,

    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch job seekers");
  }

  let data = await response.json();
  console.log(data, "hereoooo");
  return data;
}

export async function getJob(id) {
  let response = await fetch(`${BASE_URL}/jobs/${id} `);
  let data = await response.json();
  return data;
}

export async function getAllUsers() {
  const session = await auth();
  const user = session?.user;
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let { data } = await response.json();

  return data;
}

export async function getUser(id) {
  let response = await fetch(`${BASE_URL}/users/${id} `);
  let data = await response.json();

  return data;
}

export async function getAllApplicationsByUser() {
  const session = await auth();
  const user = session?.user;

  let response = await fetch(
    `${BASE_URL}/applications/my-applications`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const { data } = await response.json();

  return data;
}

export async function editJob(formData, jobId, token) {
  try {
    const response = await axios.patch(`${BASE_URL}/jobs/${jobId}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export async function getAllJobsByCompany() {
  const session = await auth();
  const user = session?.user;

  let response = await fetch(
    `${BASE_URL}/companies/${user.id}/jobs`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const { data } = await response.json();

  return data;
}

export async function getSavedJobs() {
  const session = await auth();
  const user = session?.user;
  let response = await fetch(
    `${BASE_URL}/savejobs`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const { data } = await response.json();

  return data;
}

export async function saveJob(jobId, userId, token) {
  let error;
  let data;
  try {
    data = await axios.post(
      `${BASE_URL}/savejobs`,
      {
        jobId: jobId,
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return data.data;
  } catch (err) {
    error = err.response.data;
  }

  return error;
}
export async function unSaveJob(jobId, token) {
  let error;
  let data;
  try {
    data = await axios.delete(
      `${BASE_URL}/savejobs/${jobId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return data.data;
  } catch (err) {
    error = err.response.data;
  }

  return error;
}

export async function checkSavedJob(id, token) {
  let response = await fetch(`${BASE_URL}/savejobs/${id} `, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let data = await response.json();

  return data;
}

export async function checkAppliedJob(id, token) {
  let response = await fetch(`${BASE_URL}/applications/${id} `, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let data = await response.json();

  return data;
}

export async function getJobStat(token) {
  let response = await fetch(`${BASE_URL}/jobs/job-stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let data = await response.json();

  return data;
}

export async function getActiveJobStat(token) {
  let response = await fetch(`${BASE_URL}/jobs/active-job-stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let data = await response.json();

  return data;
}

export async function getUserStat(token) {
  let response = await fetch(`${BASE_URL}/users/user-stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
  let data = await response.json();

  return data;
}

export async function getCompany(id) {
  let response = await fetch(
    `${BASE_URL}/companies/${id}`,

    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  const data = await response.json();

  return data?.data;
}

export async function getCompanyByCreator() {
  const session = await auth();
  const user = session?.user;

  let response = await fetch(
    `${BASE_URL}/users/${user.id}/company`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  const data = await response.json();

  return data?.data;
}

export async function getAllApplicationsByJob(jobId) {
  const session = await auth();
  const user = session?.user;

  let response = await fetch(
    `${BASE_URL}/jobs/${jobId}/applications`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const { data } = await response.json();

  return data?.applications;
}

export async function getAllJobs() {
  const session = await auth();
  const user = session?.user;

  let response = await fetch(
    `${BASE_URL}/jobs`,

    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const { data } = await response.json();

  return data;
}

export async function startChat(recipientId, token) {
  let error;
  let data;
  try {
    data = await axios.post(
      `${BASE_URL}/chats`,
      {
        recipientId: recipientId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log(data.data);

    return data.data;
  } catch (err) {
    console.log(err);
    error = err.response.data;
  }

  return error;
}

export async function getChat(chatId) {
  let error;
  let data;
  try {
    data = await axios.get(
      `${BASE_URL}/chats/${chatId}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data.data);

    return data.data;
  } catch (err) {
    console.log(err);
    error = err.response.data;
  }

  return error;
}
