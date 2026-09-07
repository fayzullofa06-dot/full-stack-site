const API = "http://localhost:3000";

export async function register(form) {
  try {
    const response = await fetch(`${API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    console.log("Register API response:", data);

    if (!response.ok) {
      throw new Error(
        data.error ||
        data.message ||
        `Registration failed: ${response.status}`
      );
    }

    return data;

  } catch (error) {
    console.error("Failed to register:", error);
    throw error;
  }
}