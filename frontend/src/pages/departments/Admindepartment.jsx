import React, { useEffect, useState } from 'react'
import { Department,createDepartment,deleteDepartment,updateDepartment } from '../../api/admin/admin.department'
export const Admindepartment = () => {
    
const [department,setDepartment]=useState([])
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
const [openModal,setOpenModal]=useState(false)
const [selectedDepartment,setSelectedDepartment]=useState(null)
const [modalType,setModalType]=useState('')
const [form,setForm]=useState({
    department_field:'',
    department_specification:"",
    description:"",
    createdAt:Date.now()

})
    

 useEffect(() => {
   
    async function departMent(){
        setError('')
        
        setLoading(true)
        try {
            const data= await Department()
setDepartment(data.data)
console.log(data.data)
        } catch (error) {
            console.error(error)
        }
    }
    departMent()
 
 
 }, [])
 const addDepartment =async()=>{
    try {
        setLoading(true)
        const data= await createDepartment(form)
        setDepartment(prev=>[...prev,data.data])

        setForm({
            department_field:'',
            department_specification:'',
            description:'',
        })
        setOpenModal(false)
        setModalType('create')
    } catch (error) {
        console.error(error.message)
        setError(error.message)
    }
    finally{
        setLoading(false)
    }
 }
 const handleSave =async()=>{
    try {
        setLoading(true)
        const update= await updateDepartment({
            id:selectedDepartment.id,
            department_field:form.department_field,
            department_specification:form.department_specification,
            description:form.description,
            createdAt:Date.now()
        })
       setDepartment(prev=>prev.map(teacher=>
          teacher.id===selectedDepartment.id ? {...teacher,...form}:
          teacher
        ))
        setOpenModal(false)
        setSelectedDepartment(null)
    } catch (error) {
        console.log(error.message)
        setError(error.message)
        
    }
    finally{
        setLoading(false)
    }

 }

 const handleDelete=async()=>{
    try {
        setLoading(true)
     await deleteDepartment(selectedDepartment.id)
     setDepartment(prev=>prev.filter(de=>de.id!==selectedDepartment.id))
     setOpenModal(false)
     setSelectedDepartment(null)
    } catch (error) {
        console.error(error.message)
        setError(error.message)
    }
    finally{
        setLoading(false)
    }
 }
 const hanldeKeyDown=(e)=>{
    if(e.key==='Enter'){
        addDepartment()
    }
 }
 const sortedDeparmentId=[...department].sort((a,b)=>a.id-b.id)
 
 const handleEdit=(department)=>{
    setSelectedDepartment(department)
    setForm({
        department_field:department.department_field,
        department_specification:department.department_specification,
        description:department.description
    })
    setModalType('edit')
    setOpenModal(true)
 }
 const handleD=(department)=>{
    setSelectedDepartment(department)
    setModalType('delete')
    setOpenModal(true)
 }
const openCreateModal=()=>{
  setModalType('create')
  setOpenModal(true)
}



const handleChange=(e)=>{
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
} 

if(error){
     return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-700">
            Failed to load dashboard
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        </div>
      );
}
  return (
    <div>

        <div className='flex justify-between'>
            <div> 
                <h1 className='text-2xl'>Manage Students</h1>
                 <p className="text-sm text-fuchsia-200">
              View, add, edit, and remove students.
            </p>

            </div>
            <button onClick={openCreateModal} className='rounded-xl bg-black px-5 py-3  text-white'>+Add Department</button>
        </div>
        
        <div className='mt-8 overflow-hidden rounded-2xl border shadow-2xl'>
            <table className='w-full text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>department_field</th>
                        <th>department_specification</th>
                        <th>description</th>
                        <th>createdAt</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedDeparmentId.map((department)=>(
                        <tr key={department.id}>
                            <td className='px-8 py-6'>{department.id}</td>
                            <td>{department?.department_field? department.department_field:'No field'}</td>
                            <td>{department?.department_specification? department.department_specification:'No specification'}</td>
                            <td>{department?.description? department.description:'No description'}</td>
                            <td>{department?.createdAt? department.createdAt:'No time'}</td>
                            <td className='px-8 py-6'>

                            <div className='flex gap-2'>
                                <button onClick={()=>handleEdit(department)} className='rounded-lg border px-3 py-2 text-sm'>Edit</button>
                                <button className='rounded-lg border px-3 py-2 text-sm text-red-600' onClick={()=>handleD(department)}>Delete</button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


        {modalType==='create'&&openModal&&(
            <div className='fixed inset-0  flex items-center justify-center bg-black/50 px-4'>
                <div className='w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl'>
                    <div className='mb-6 flex items-start justify-between'>
                        <div>
                            <h2 className='text-2xl font-semibold text-gray-900'>Create Department</h2>
                            <p className='mt-1 text-sm text-gray-500'>Add a new department to the system </p>
                        </div>
                        <button type='button' onClick={()=>setOpenModal(false)}>X</button>
                    </div>
                    <form onSubmit={(e)=>e.preventDefault()} className='space-y-5'>
                        <div>
                            <label className='mb-2 text-sm font-medium text-gray-700'>department_field</label>
                            <input type="text"name='department_field'value={form.department_field} 
                            onChange={handleChange}
                                                        onKeyDown={hanldeKeyDown}

                            placeholder='Computer Science' 
                            className='w-full rounded-xl border border-gray-300 px-4 py-2 outline-none    transition focus:border-black focus:ring-2 focus:ring-gray-200' />
                        </div>
                        <div>
                            <label className='mb-2 block text-sm font-medium text-gray-700'>department_specification</label>
                            <input type="text"name='department_specification'  value={form.department_specification}
                            onChange={handleChange}
                                                        onKeyDown={hanldeKeyDown}

                            placeholder='Artificial intelligence & Robotics'
                            className='w-full rounded-xl outline-none border border-gray-300 px-4 py-3 
                            transition focus:border-black focus:ring-2 focus:ring-gray-200'
                            />
                        </div>
                        <div>
                            <label className='mb-4  block text-sm font-medium text-gray-700'>description</label>
                            <input type="text" name='description' value={form.description} 
                            onChange={handleChange}
                            onKeyDown={hanldeKeyDown}
                            placeholder='distributed systems'
                            className='w-full outline:none border border-gray-300 px-4 py-3 rounded-xl transition focus:border-black focus:ring-2 focus:ring-gray-200' />
                        </div>
                    </form>
                    <div className=' mt-9   flex justify-end gap-3 border-t pt-5'>
                        <button  onClick={()=>setOpenModal(false)} className='rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100' type='button'>Cancel</button>
                        <button type='submit' className='rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 '      
                        onClick={addDepartment}>Create Department</button>
                    </div>
                </div>
            </div>
        )}


{modalType==='edit'&&openModal&&(
  <div className='fixed inset-0 z-50 flex items-center   justify-center bg-black/50 px-4'>
    <div className='  w-full  max-w-lg rounded-2xl bg-white p-7 shadow-2xl'>
        <div className='mb-6 flex items-center justify-between'>
            <div>
                <h2 className='text-2xl font-semibold text-gray-900'>Edit user</h2>
                <p className='mt-1 text-sm text-gray-500'> Update the department's information.</p>
            </div>
            <button  className='rounded-lg px-3 py-2 text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700' onClick={()=>setOpenModal(false)}>X</button>
        </div>
     <form type='submit' onSubmit={(e)=>e.preventDefault()}>
        <div>
            <label className='mb-2 block text-sm font-medium text-gray-700' >department_field</label>
            <input type="text" name='department_field' value={form.department_field} onChange={handleChange} placeholder='Software Engineer' className='w-full rounded-xl outline-none border border-gray-300 px-4 py-3 transition focus:border-black focus:ring-2 focus:ring-gray-200' />
        </div>

        <div>
            <label className='mb-2 mt-4  text-sm  block font-medium text-gray-700'>department_specification</label>
            <input type="text" name='department_specification' value={form.department_specification} className='w-full rounded-xl outline-none border border-gray-300 px-4 py-3 transition hover:border-black focus:ring-2 focus:ring-gray-200' onChange={handleChange} />
        </div>
        <div>
            <label className='mb-2 mt-3 text-sm block font-medium text-gray-700'>description</label>
            <input type="text" name='description' onChange={handleChange} value={form.description} className='w-full border border-gray-300 rounded-xl outline-none px-3 py-3 transition focus:border-black focus:ring-2 focus:ring-gray-200' />
        </div>


     <div className='flex justify-end gap-5 mt-6'>
        <button  className='rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100' onClick={()=>setOpenModal(false)}>Cancel</button>
        <button  type='submit' className='rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:bg-gray-800'  onClick={handleSave}>Save Changes</button>
     </div>
     </form>
    </div>
  </div>
)}

{openModal&&modalType==='delete'&&(
    <div className='fixed  flex inset-0 z-50 justify-center items-center px-4 bg-black/50'>
        <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl'>
            <h1 className='text-lg'>Delete students</h1>
            <p className='mt-2 text-sm text-gray-500'>
                 Are you sure you want to delete this student? This action cannot be undone
            </p>
            <div className='mt-5 rounded-xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500'>Department Field </p>
                <p className='font-medium text-gray-900'>
                    {selectedDepartment?.department_specification? selectedDepartment.department_specification:'Unknown specification'}
                </p>
            </div>
            <div className='mt-4 rounded-2xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500 '> Department Specification  </p>
                <p className='text-gray-900 font-medium'>{selectedDepartment?.department_specification?selectedDepartment.department_specification:'Unknown specification'}</p>
            </div>
            <div className='mt-4 rounded-2xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500 '> Department Specification  </p>
                <p className='text-gray-900 font-medium'>{selectedDepartment?.description?selectedDepartment.description:'Unknown description'}</p>
            </div>

        <div className=' mt-5 flex justify-end gap-5'>
            <button className=' bg-gray-600  text-white rounded-xl border px-5 py-3 text-sm hover:bg-gray-400' onClick={()=>setOpenModal(false)}>Cancel</button>
            <button  onClick={handleDelete} className='rounded-xl border bg-red-600 px-5 py-3 text-sm text-white hover:bg-red-400    '>Delete</button>
        </div>
        </div>
    </div>
)}

    </div>
  )
}
