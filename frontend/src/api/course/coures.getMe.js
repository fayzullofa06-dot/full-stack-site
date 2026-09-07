const API = import.meta.env.VITE_API_URL;
export async function getMyCourses() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API}/enroll/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch my courses");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch my courses:", error);
    throw error;
  }
}