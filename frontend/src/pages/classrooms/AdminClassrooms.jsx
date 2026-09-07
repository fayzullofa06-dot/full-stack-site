import React, { useState,useEffect } from 'react'

import { Classroom,createClassroom, updateClassroom,deleteClassroom } from '../../api/admin/admin.totalClassroom'

export const AdminClassrooms = () => {
    const [classroom,setClassroom]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')
    const [openModal,setOpenModal]=useState(false)
    const[selectedClassroom,setSelectedClasroom]=useState(null)
    const [modalType,setModalType]=useState('')
    const [form,setForm]=useState({  
        building:'',
        room_number:'',
        capacity:'',
        room_type:''
    })

    
    useEffect(() => {
       
        async function getCourse(){
            try {
                setError('')
                setLoading(true)
                const data= await Classroom()
                setClassroom(data.data)
                console.log(data.data)
            } catch (error) {
                console.error(error)
                setError(error.message)
                
            }finally{
                setLoading(false)
            }
        }
        getCourse()
    
     

    }, [])

    
    const handleAdd=async()=>{

        try {
            setLoading(true)
             const data= await createClassroom(form)
             setClassroom(prev=>[...prev,data.data])
             setForm({
                building:'',
        room_number:0,
        capacity:0,
        room_type:''

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
    
    const handleSave=async()=>{
        try {
            setLoading(true)
            await updateClassroom({
                id:selectedClassroom.id,
                ...form
            })
            setClassroom(prev=>prev.map(classroom=>classroom.id===selectedClassroom.id? {...classroom,...form}:
                classroom
            ))
            setOpenModal(false)
            setSelectedClasroom(null)
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
            await deleteClassroom(selectedClassroom.id)
            setClassroom(prev=>prev.filter(classroom=>classroom.id!==selectedClassroom.id)) 
            setOpenModal(false)
            setSelectedClasroom(null)
        } catch (error) {
            console.error(error.message)
            setError(error.message)
            
        }
        finally{
            setLoading(true)
        }
    }
    const handleEdit=(classroom)=>{
        setSelectedClasroom(classroom)
        setModalType('edit')
    
        setForm({
             building:classroom.building,
        room_number:classroom.room_number,
        capacity:classroom.capacity,    
        room_type:classroom.room_type
        })
        setOpenModal(true)
    }
    
    const handleD=(classroom)=>{
        setSelectedClasroom(classroom)
        setModalType('delete')
        setOpenModal(true)
    }
    const handleChange= (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const openCreateModal=()=>{
  setModalType('create')
  setOpenModal(true)
}
const sortedByid = [...classroom].sort((a, b) => a.id - b.id)


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
            <div >
                <h1 className='text-2xl'>Manage Classrooms</h1>
                <p className='text-sm text-fuchsia-200'>
                    View, add,edit, and move students.
                </p>
            </div>
            <button  className='rounded-xl bg-black px-5 py-4 text-white hover:bg-gray-600' onClick={openCreateModal}> + Add classroom</button>
        </div>

        <div className='mt-8 overflow-hidden rounded-2xl border shadow-2xl'>
            <table className='w-full text-center'> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>building</th>
                        <th>room_number</th>
                        <th>capacity</th>
                        <th>room_type</th>
                    </tr>
                </thead>
            
            <tbody>
                {sortedByid.map((classroom)=>(
                    <tr key={classroom.id}>
                        <td>{classroom.id}</td>
                        <td>{classroom.building}</td>
                        <td>{classroom.room_number}</td>
                        <td>{classroom.capacity}</td>
                        <td>{classroom.room_type}</td>

                        <td className='px-8 py-6'>
                            <div className='flex gap-3'>
                                <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-600" onClick={()=>handleEdit(classroom)}>Edit</button>
                                <button onClick={()=>handleD(classroom)} className='rounded-lg border px-3 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500'>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                

            </tbody>
            </table>
        </div>
         {modalType === 'create' && openModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Create Department
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add a new department to the system
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Building
          </label>

          <input
            type="text"
            name="building"
            value={form.building}
            onChange={handleChange}
            placeholder="Computer Science"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Room Number
          </label>

          <input
            type="text"
            name="room_number"
            value={form.room_number}
            onChange={handleChange}
            placeholder="101"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Capacity
          </label>

          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="50"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Room Type
          </label>

          <input
            type="text"
            name="room_type"
            value={form.room_type}
            onChange={handleChange}
            placeholder="Laboratory"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="mt-9 flex justify-end gap-3 border-t pt-5">
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleAdd}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Create Classroom
          </button>
        </div>
      </form>
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
            <label className='mb-2 block text-sm font-medium text-gray-700' >building</label>
            <input type="text" name='building' value={form.building} onChange={handleChange} placeholder='Software Engineer' className='w-full rounded-xl outline-none border border-gray-300 px-4 py-3 transition focus:border-black focus:ring-2 focus:ring-gray-200' />
        </div>

        <div>
            <label className='mb-2 mt-4  text-sm  block font-medium text-gray-700'>room_number</label>
            <input type="text" name='room_number' value={form.room_number} className='w-full rounded-xl outline-none border border-gray-300 px-4 py-3 transition hover:border-black focus:ring-2 focus:ring-gray-200' onChange={handleChange} />
        </div>
        <div>
            <label className='mb-2 mt-3 text-sm block font-medium text-gray-700'>capacity</label>
            <input type="text" name='description' onChange={handleChange} value={form.capacity} className='w-full border border-gray-300 rounded-xl outline-none px-3 py-3 transition focus:border-black focus:ring-2 focus:ring-gray-200' />
        </div>
        <div>
            <label className='mb-2 mt-3 text-sm block font-medium text-gray-700'>room_type</label>
            <input type="text" name='room_type' onChange={handleChange} value={form.room_type} className='w-full border border-gray-300 rounded-xl outline-none px-3 py-3 transition focus:border-black focus:ring-2 focus:ring-gray-200' />
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
                    {selectedClassroom?.building? selectedClassroom.building:'Unknown building'}
                </p>
            </div>
            <div className='mt-4 rounded-2xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500 '>  room_number  </p>
                <p className='text-gray-900 font-medium'>{selectedClassroom?.room_number?selectedClassroom.room_number:'Unknown room_number'}</p>
            </div>
            <div className='mt-4 rounded-2xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500 '>capacity    </p>
                <p className='text-gray-900 font-medium'>{selectedClassroom?.capacity?selectedClassroom.capacity:'Unknown capacity'}</p>
            </div>
            <div className='mt-4 rounded-2xl bg-gray-50 p-4'>
                <p className='text-sm text-gray-500 '>room_type    </p>
                <p className='text-gray-900 font-medium'>{selectedClassroom.room_type?selectedClassroom.room_type:'Unknown room_type'}</p>
            </div>

        <div className=' mt-5 flex justify-end gap-5'>
            <button className=' bg-gray-600  text-white rounded-xl border px-5 py-3 text-sm hover:bg-gray-400' onClick={()=>setOpenModal(false)}>Cancel</button>
            <button   onClick={handleDelete} className='rounded-xl border bg-red-600 px-5 py-3 text-sm text-white hover:bg-red-400    '>Delete</button>
        </div>
        </div>
    </div>
)}
    </div>
  )
}
