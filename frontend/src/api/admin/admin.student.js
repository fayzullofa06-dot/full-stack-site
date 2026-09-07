const API = import.meta.env.VITE_API_URL;


    export async function getStudents(){
        const token= localStorage.getItem('token')
        try {
            const fetchStudents= await fetch(`${API}/student`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
            }
            })  
            const data= await fetchStudents.json()
            if(!fetchStudents.ok){
            throw new Error(data.message||"failed to fetch students",);
            
            }
            return data
        } catch (error) {
            console.error("failed to fetch All students",error)
            throw error
            
        }
    }
    export async function updateStudents(form){
        const token= localStorage.getItem('token')
        try {
            const fetchStudents= await fetch(`${API}/student/${form.id}`,{
                method:"PATCH",
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type':"application/json",
                },
                body:JSON.stringify(form)
            })  
            const data= await fetchStudents.json()
            if(!fetchStudents.ok){
            throw new Error(data.message||"failed to Update students",);
            
            }
            return data
        } catch (error) {
            console.error("failed to fetch All students",error)
            throw error
            
        }
    }
    export async function deleteStudents(id){
        const token= localStorage.getItem('token')
        try {
            const fetchStudents= await fetch(`${API}/student/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type':"application/json",
            }
            })  
            const data= await fetchStudents.json()
            if(!fetchStudents.ok){
            throw new Error(data.message||"failed to delete students",);
            
            }
            return data
        } catch (error) {
            console.error("failed to fetch All students",error)
            throw error
            
        }
    }
    export async function createStudents(form){
        const token= localStorage.getItem('token')
        try {
            const fetchStudents= await fetch(`${API}/student`,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type':"application/json",
            },
            body:JSON.stringify(form)
            })  
            const data= await fetchStudents.json()
            if(!fetchStudents.ok){
            throw new Error(data.message||"failed to create students",);
            
            }
            return data
        } catch (error) {
            console.error("failed to fetch All students",error)
            throw error
            
        }
    }