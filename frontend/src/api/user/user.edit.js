const API = import.meta.env.VITE_API_URL;


export async function edit(form){
    const token= localStorage.getItem('token')
try {
    const url= await fetch(`${API}/user/me`,{
        method:"PATCH",
        headers:{ 'Content-Type':'application/json',
Authorization: `Bearer ${token}`
        },

        body:JSON.stringify(form)
        })
        const data= await url.json()

            if (!url.ok) {
      throw new Error(
        data.error ||
        data.message ||
        `Updating failed: ${url.status}`
      );
    }
    return data
} catch (error) {
      console.error("Failed to register:", error);
    throw error;
}
}