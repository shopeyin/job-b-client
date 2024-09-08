import { auth, signIn } from "@/auth";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const BASE_URL = "http://localhost:3000/api/v1";

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

    console.log(data, "LOGIN API");

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

export async function getJob(id) {
  let response = await fetch(`${BASE_URL}/jobs/${id} `);
  let data = await response.json();
  return data;
}

export async function getSavedJobs() {
  const session = await auth();
  const user = session?.user;
  console.log("GET SAVED JOBS");
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

export async function createJob(formData, token) {
  try {
    const response = await axios.post(`${BASE_URL}/jobs`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log(response);
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

export async function editJob(formData,jobId, token) {
  try {
    const response = await axios.patch(`${BASE_URL}/jobs/${jobId}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log(response);
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
