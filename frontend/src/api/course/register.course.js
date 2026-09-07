const API = "http://localhost:3000";

export async function enrollCourse(courseId) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token");
  }

  try {
    const response = await fetch(`${API}/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        course_id: courseId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to enroll");
    }

    return data;
  } catch (error) {
    console.error("Failed to enroll:", error);
    throw error;
  }
}