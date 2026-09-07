import { jsx } from "react/jsx-runtime";

const API = import.meta.env.VITE_API_URL;



export async function  totalCourses(){
    const token= localStorage.getItem('token')
    try {
        const info= await fetch(`${API}/course  `,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`
            }
            
            
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||"failed to fetch",);
            
        }
        return data
    } catch (error) {
        console.error('courses werent fetched',error)
        throw error
        
    }
}
export async function  createCourse(form){
    const token= localStorage.getItem('token')
    try {
        const info= await fetch(`${API}/course/${form.id}  `,{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(form)
            
            
        })
        const data= await info.json()
        if(!info.ok){
            throw new Error(data.message||"failed to fetch",);
            
        }
        return data
    } catch (error) {
        console.error('courses werent fetched',error)
        throw error
        
    }
}
