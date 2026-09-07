import React, { useState,useEffect } from 'react'
import { totalCourses,createCourse } from '../../api/admin/admin.course'
  import { Department } from '../../api/admin/admin.department'
  import { asadosgandos } from '../../api/admin/admin.teachers'



export const Admintotalcourses = () => {
const [course,setCourse]=useState([])
const [error,setError]=useState('')
const[loading,setLoading]=useState(false)
const [modalType,setModalType]=useState('')
const [openModal,setOpenModal]=useState(false)
const [department,setDepartment]=useState([])
const [teacher,setTeacher]=useState([])
const [selectedCourse,setSelectedCourse]=useState(null)
const [form,setForm]=useState({
    department_id:'',
    teacher:'',
    name:"",
    description:'',
    location:"",
    status:""
})


useEffect(() => {
  async function getCourses(){
    try {
        setLoading(true)
     const [coursesData,departmentData,teacherData]= await Promise.all([
        totalCourses(),
        Department(),
        asadosgandos()
     ])
     setCourse(coursesData.data)
    setDepartment (departmentData.data)
    setTeacher (teacherData.data)
    } catch (error) {
        console.error(error.message)
        setError(error.message)
    }
    finally{
        setLoading(false)
    }
  }
  getCourses()
}, [])

const handleAdd= async()=>{
    try {
        const data= await createCourse(form)
     setCourse(prev=>[...prev,data.data])
     setForm({
          department_id:'',
    teacher:'',
    name:"",
    description:'',
    location:"",
    status:""
     })
     setOpenModal(false)
    } catch (error) {
         console.error(error.message)
    setError(error.message)
        
    }
}
const openAddModal=()=>{
    setSelectedCourse(null)
    setForm({
         department_id:'',
    teacher:'',
    name:"",
    description:'',
    location:"",
    status:""
    })
    setModalType('create')
    setOpenModal(true)
}

 const handleChange=(e)=>{
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
 }

const openCreateModal=()=>{
setModalType('create')
setOpenModal(true)
}

if(error){
     return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-700">
            Failed to load Courses
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
                <h1 className='text-2xl'>Manage courses</h1>
                <p className='text-sm  text-fuchsia-400'>View, add, edit, and remove students.</p>
            </div>
            <button onClick={openAddModal} className='rounded-xl border px-4 py-3 bg-black text-white hover:bg-gray-500 '>Add courses</button>
        </div>
       <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-2xl">
    <table className="w-full table-fixed text-center">
        <thead className="border-b bg-gray-50">
            <tr>
                <th className="w-16 px-4 py-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="w-32 px-4 py-4 text-sm font-semibold text-gray-600">Department</th>
                <th className="w-32 px-4 py-4 text-sm font-semibold text-gray-600">Teacher</th>
                <th className="w-32 px-4 py-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="w-72 px-6 py-4 text-sm font-semibold text-gray-600">Description</th>
                <th className="w-32 px-4 py-4 text-sm font-semibold text-gray-600">Location</th>
                <th className="w-28 px-4 py-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
        </thead>

        <tbody className="divide-y">
            {course.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">

                    <td className="px-4 py-5 text-sm">
                        {course.id}
                    </td>

                    <td className="px-4 py-5 text-sm">
                        {course.department.department_field}
                    </td>

                    <td className="px-4 py-5 text-sm">
                        {course?.teacher || 'no teacher'}
                    </td>

                    <td className="px-4 py-5 text-sm font-medium">
                        {course?.name || 'no name'}
                    </td>

                    <td className="px-6 py-5 text-left">
                        <div className="line-clamp-2 text-sm leading-6 text-gray-600">
                            {course?.description || 'no description'}
                        </div>
                    </td>

                    <td className="px-4 py-5 text-sm">
                        {course?.location || 'no location'}
                    </td>

                    <td className="px-4 py-5 text-sm">
                        {course?.status || 'no status'}
                    </td>

                    <td className='px-8 py-6'>
                        <div className=' flex gap-3'>
                            <button className='rounded-lg border px-3 py-2 text-sm'>Edit</button>
                            <button className='rounded-lg border px-3 py-2 text-sm text-red-600 hover:text-red-300'>Delete</button>
                        </div>
                    </td>

                </tr>
            ))}
        </tbody>
    </table>
</div>


{modalType==='create'&&openModal&&(
    <div className='fixed inset-0 bg-black/40 z-50 flex item-center justify-center px-4' >
        <div className='w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl'>
            <div className='mb-6 flex items-start justify-between'>
                <div>

                <h2 className='text-2xl font-semibold text-gray-900'>Create course</h2>
                <p className='mt-1 text-sm text-gray-500'>Add a new course </p>
                </div>
                <button  className='text-lg mt-1 text-red-700'  onClick={()=>setOpenModal(false)}>X</button>
            </div>
            <form onSubmit={(e)=>e.preventDefault()}>
                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>Department</label>
                   <select  onChange={handleChange}  value={form.department_id} name="department_id"  className='w-full rounded-xl border px-4 py-3 outline-none      focus:ring-2 focus:ring-gray-300'>
                    <option className='w-full rounded-xl  px-4 py-3' value="">Select Department</option>
                    {department.map((value)=>(
                        <option  key={value.id} value={value.id}>
                            {value.department_field}
                        </option>
                    ))}
                   </select> 
                </div>
                <div> 
                    <label className='mb-2 mt-5 block text-sm font-medium text-gray-600 '>Teacher</label>
                    <select onChange={handleChange} className='w-full outline-none border focus:ring-2 focus:ring-gray-300 rounded-xl px-4 py-3 ' name="teacher" >
                        <option className='w-full rounded-xl border px-4 py-3'>Select teacher</option>
                        {teacher.map((value)=>(
                            <option key={value.id} value={value.id}>{value.User.firstName ? value.User.firstName:'No teacher'} {value.User.lastName ? value.User.lastName:'No teacher'}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700 mt-5 px-1'>Name</label>
                    <input onChange={handleChange} type="text" value={form.name} name='name' className='w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300' placeholder='Tech field'/>
     
                </div>
                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700 mt-5 px-1'>description</label>
                    <input onChange={handleChange} name='description' type="text" value={form.description} className='w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300' placeholder='Learning programming'/>
                        
                </div>
                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700 mt-5 px-1'>Location</label>
                    <input name='location' onChange={handleChange} type="text" value={form.location} className='w-full  rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300' 
                      placeholder='New York'/>
                        
                </div>
                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700 mt-5 px-1'>Status</label>
                    
                    <select onChange={handleChange} name="status" value={form.status} className='w-full rounded-xl border px-4 py-3 '>
                        <option value="available">available</option>
                        <option value="full">full</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                        
                        <div className='mt-7 flex justify-end gap-3'>
                            <button className='rounded-xl border px-5 py-3 text-sm' onClick={()=>setOpenModal(false)}>Cancel</button>
                            <button onClick={handleAdd} className='rounded-xl bg-black px-5 py-3 text-sm text-white hover:bg-gray-500'>Add course</button>
                        </div>
                </div>
            </form>
            
        </div>
    </div>
)}

    </div>
  )
}
