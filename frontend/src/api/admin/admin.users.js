const API = "http://localhost:3000";


export async function getUsersAll (){
const token=localStorage.getItem('token')

    try {
        const getUsers= await fetch(`${API}/user`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data= await getUsers.json()

        if(!getUsers.ok){
            throw new Error(data.message||'failed to fetch users');
        }
        if(token){
            return data
        }
    
        
    } catch (error) {
        console.error("Failed to fetch my courses:", error);
    throw error;
    }
}