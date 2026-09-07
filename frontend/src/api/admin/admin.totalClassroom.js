const API='http://localhost:3000';



export async function Classroom(){
    const token=localStorage.getItem('token')
    try {
        const info= await fetch(`${API}/classroom`,{
            method:"GET",
            headers:{
                Authorization :`Bearer ${token}`
            }
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||'failed to fetch data');
            
        }
        return data
    } catch (error) {
        console.error('failed to fetch classrooms',error)
        throw error
    }
}
export async function createClassroom(form){
    const token=localStorage.getItem('token')
    try {
        const info= await fetch(`${API}/classroom/`,{
            method:"POST",
            headers:{
                Authorization :`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(form)
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||'failed to fetch data');
            
        }
        return data
    } catch (error) {
        console.error('failed to fetch classrooms',error)
        throw error
    }
}
export async function updateClassroom(form){
    const token=localStorage.getItem('token')
    try {
        const info= await fetch(`${API}/classroom/${form.id}`,{
            method:"PATCH",
            headers:{
                Authorization :`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(form)
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||'failed to fetch data');
            
        }
        return data
    } catch (error) {
        console.error('failed to fetch classrooms',error)
        throw error
    }
}
export async function deleteClassroom(id){
    const token=localStorage.getItem('token')
    try {
        const info= await fetch(`${API}/classroom/${id}`,{
            method:"DELETE",
            headers:{
                Authorization :`Bearer ${token}`,
            },
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||'failed to fetch data');
            
        }
        return data
    } catch (error) {
        console.error('failed to fetch classrooms',error)
        throw error
    }
}

