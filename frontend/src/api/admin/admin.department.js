const API='http://localhost:3000';




export  async function Department(){
    const token= localStorage.getItem('token');
    try {
        const info= await fetch(`${API}/department`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||"failed to fetch Department");
            
        }
        return data
    } catch (error) {
        console.error('failed to get info from backend',error)
        throw error
    }
}


export async function createDepartment(form){
    const token= localStorage.getItem('token');
    try {
        const data= await fetch(`${API}/department`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(form)
        })
        const response= await data.json()
        if(!data.ok){
            throw new Error(data.message||'there has been an error while fetching');
            
        }
        return response
    } catch (error) {
        console.error(error.message)
     throw error
    }
}

export async function updateDepartment(form){
const token= localStorage.getItem('token');
    try {
        const  data= await fetch(`${API}/department/${form.id}`,{
            method:"PATCH",
           
           headers:{
             Authorization:` Bearer ${token}`,
           'Content-Type':'application/json'
        },
        body:JSON.stringify(form)
        }
    )
        const response= await data.json()
       if(!data.ok){
        throw new Error(data.message||'There has been an error while fetching ');
        
       }
       return response
    } catch (error) {
        console.error(error.message)
        throw error

    }
}


export async function deleteDepartment(id){
    const token = localStorage.getItem('token');
    try {
        const data= await fetch(`${API}/department/${id}`,{
            method:"DELETE",
            headers:{
            Authorization:` Bearer ${token}`
            }
        })
        const response= await data.json()
        if(!data.ok){
            throw new Error(data.message||'there has been an error while fetching');
            
        }
        return response 
    } catch (error) {
        console.error(error.message)
        throw error
    }
}