export const BASE_URL = "http://localhost:3000/api/v1";

export async function fetchJobs(query) {
  let response = await fetch(
    `${BASE_URL}/jobs?${query ? `title=${query}` : ""}`,

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

export async function getUser(id) {
  let response = await fetch(`${BASE_URL}/users/${id} `);
  let data = await response.json();

  return data;
}

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
