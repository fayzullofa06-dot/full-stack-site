    const API="http://localhost:3000"


    export async function courseGet(){
        try {
            const Info= await fetch(`${API}/course`,{
                method:"GET",
    
            })
            if(!Info.ok){
                throw new Error(`failed to fetch :${Info.status}`);
                
            }
            const data =  await Info.json()
            return data
        } catch (error) {
            console.error('failed to fetch ',error.message)
        }
    }
