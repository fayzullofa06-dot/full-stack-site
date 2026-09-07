const API = import.meta.env.VITE_API_URL;
export async function getMySchedule() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API}/schedules/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch schedule");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    throw error;
  }
}   