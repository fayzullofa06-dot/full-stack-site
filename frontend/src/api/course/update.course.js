const API = import.meta.env.VITE_API_URL;
export async function deleteEnrollment(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}/enroll/me/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to remove enrollment");
    }

    return data;
}