const API = import.meta.env.VITE_API_URL;



export  async function Enrollments(){
    const token= localStorage.getItem('token');
    try {
        const info= await fetch(`${API}/enroll`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||"failed to fetch Enrollments");
            
        }
        return data
    } catch (error) {
        console.error('failed to get info from backend',error)
        throw error
    }
}