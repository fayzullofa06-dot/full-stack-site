const API = import.meta.env.VITE_API_URL;
export async function getAllUsers(){
    const token= localStorage.getItem('token')
    try {
        const response= await fetch(`${API}/user`,{
            method:"GET",
            
            headers:{
            Authorization:`Bearer ${token}`
            }
                    })
const data= await response.json()
                    if(!response.ok){
            throw new Error(data.message||'There has been an error while fetching');
            
        }
        return data
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export async function createUser(form){
    const token= localStorage.getItem('token')
    try {
        const response= await fetch(`${API}/user`,{
            method:"POST",
            
            headers:{
                'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(form)
                    })
const data= await response.json()
                    if(!response.ok){
            throw new Error(data.message||'There has been an error while fetching');
            
        }
        return data
    } catch (error) {
        console.error(error.message)
        throw error
    }
}
export async function updateUser(form){ 
    const token= localStorage.getItem('token')
    try {
        const response= await fetch(`${API}/user/${form.id}`,{
            method:"PATCH",
            
            headers:{
                  "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(form)
                    })
const data= await response.json()
                    if(!response.ok){
            throw new Error(data.message||'There has been an error while fetching');
            
        }
        return data
    } catch (error) {
        console.error(error.message)
        throw error
    }
}
export async function deleteUser(id){ 
    const token= localStorage.getItem('token')
    try {
        const response= await fetch(`${API}/user/${id}`,{
            method:"DELETE",
            
            headers:{
            Authorization:`Bearer ${token}`
            },
                    })
const data= await response.json()
                    if(!response.ok){
            throw new Error(data.message||'There has been an error while fetching');
            
        }
        return data
    } catch (error) {
        console.error(error.message)
        throw error
    }
}