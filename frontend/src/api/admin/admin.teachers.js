        const API = "http://localhost:3000";



        export async function asadosgandos(){
            const token= localStorage.getItem('token')
            try {
                const takemyCUm= await fetch(`${API}/teacher`,{
                    method:"GET",
                    headers:{
                        Authorization:` Bearer ${token}`
                    }
                })
                const data= await takemyCUm.json()
                if(!takemyCUm.ok){
                    throw new Error(data.message||"failed to fetch teachers");
                    
                }
                return data
            } catch (error) {
                console.error('failed to receive info from backend ',error)
                throw error
                
            }
        }


        

        export async function editTeacher(form){
            const token= localStorage.getItem('token')
            try {
                const edit= await fetch(`${API}/teacher/${form.id}`,{
                    method:"PATCH",
                headers:{ 
                    Authorization:`Bearer ${token}`,
                "Content-Type":'application/json'
                },
                body:JSON.stringify(form)
                })
                const data= await edit.json()
                if(!edit.ok){
                    throw new Error("There has bene an error while fetching",data.error);
                    
                }
                return data

            } catch (error) {
                console.error(error.message||'Cant not update teachers')
                throw error
            }
        }

        export async function deleteTeacher(id){
            const token= localStorage.getItem('token')
            try {
                const deleteTeachers= await fetch(`${API}/teacher/${id}`,{
                    method:"DELETE",
                headers:{ 
                    Authorization:`Bearer ${token}`,
                "Content-Type":'application/json'
                },
                })
                const data= await deleteTeachers.json()
                if(!deleteTeachers.ok){
                    throw new Error("There has bene an error while fetching",data.error);
                    
                }
                return data

            } catch (error) {
                console.error(error.message||'Cant not Delete teachers')
                throw error
            }
        }
        export async function AddTeacher(form){
            const token= localStorage.getItem('token')
            try {
                const deleteTeachers= await fetch(`${API}/teacher`,{
                    method:"POST",
                headers:{ 
                    Authorization:`Bearer ${token}`,
                "Content-Type":'application/json'
                },
                body:JSON.stringify(form)
                })
                const data= await deleteTeachers.json()
                if(!deleteTeachers.ok){
                    throw new Error(data.message || data.error || "Failed to add teacher");
                    
                }
                return data

            } catch (error) {
                console.error(error.message||'Cant not POST teachers')
                throw error
            }
        }