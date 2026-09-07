const API="http://localhost:3000"

export async function getMe (){
    const token=localStorage.getItem('token',)

    try {
        const response= await fetch(`${API}/user/me`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
            
        })
         if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

        const data= await response.json()
    
        return data
    } catch (error) {
console.error('failed to fetch',error.message)
        
    }
}
