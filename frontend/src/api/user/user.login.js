
const API = import.meta.env.VITE_API_URL;

    export async function login (form){
        try {
            
            const login= await fetch(`${API}/user/login`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json',

                },
                body:JSON.stringify(form)

            })
            const data= await login.json()

            if(!login.ok){
                throw new Error(data.message||'Login failed');
                
            }
            return data
        } catch (error) {
            console.error('failed to login',error)
            throw error
        }
    }
