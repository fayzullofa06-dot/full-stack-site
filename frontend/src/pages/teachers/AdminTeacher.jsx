  import React, { useEffect, useState } from 'react'
  import { asadosgandos } from '../../api/admin/admin.teachers'
  import { editTeacher } from '../../api/admin/admin.teachers'
  import { deleteTeacher } from '../../api/admin/admin.teachers'
  import { AddTeacher } from '../../api/admin/admin.teachers'
  export const AdminTeacher = () => {
    const [openModal, setOpenModal] = useState(false)
    const [teacher, setTeachers] = useState([])
    const [error, setError] = useState()
    const [modaltype,setModaltype]=useState('')
    const [selectedTeacher,setSelectedTeacher]=useState(null)
    const [form,setForm]=useState({
      department_id:'',
      user_id:'',
      phone:'',
      hire_date:"",
      status:"",
      role:'teacher'
    })





    useEffect(() => {
      async function getTeachers() {
        try {
          setError('')
          const data = await asadosgandos()
          setTeachers(data.data)
        } catch (error) {
          console.error(error)
          setError(error.message)
        }
      }

      getTeachers()
    }, [])

    
    async function handleSave(){
      try {
        const data= await editTeacher({
          id:selectedTeacher.id,
          ...form
        })
        console.log(data)
        setTeachers(prev=>prev.map(teacher=>
          teacher.id===selectedTeacher.id ? {...teacher,...form}:
          teacher
        ))
        setOpenModal(false)
      } catch (error) {
        setError(error.message)
      }
    }


    


    const sortedTeachers = [...teacher].sort((a, b) => a.id - b.id)

    const handleChange=(e)=>{
      setForm({...form,
        [e.target.name]:e.target.value
      })
    }

    const handleEdit=(teacher)=>{
  setSelectedTeacher(teacher)

  setForm({
  department_id:teacher.department_id,
  user_id:teacher.user_id,
  phone:teacher.phone,
  hire_date:teacher.hire_date,
  status:teacher.status,
  role:teacher.role
  })
  setModaltype('edit')
  setOpenModal(true)
    }
  const handleDelete=(teacher)=>{
  setSelectedTeacher(teacher)
  setModaltype('delete')
  setOpenModal(true)
  }
  
  const handleConfirmDelete= async()=>{
  try {
    await deleteTeacher(selectedTeacher.id)
  setTeachers(prev=>prev.filter(value=>value.id!==selectedTeacher.id))
  setOpenModal(false)
  setSelectedTeacher(null)
  } catch (error) {
  setError(error.message) 
  }
  }
  
  const handleAdd= async()=>{
    try {

      
      await AddTeacher(form)
      const data= await asadosgandos()
setTeachers(data.data)
      console.log("FORM BEING SENT:", form)
        setOpenModal(false)
      setForm({
        department_id: '',
        user_id: '',
        phone: '',
        hire_date: '',
        status: 'active',
        role:'teacher'
      })
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  }
  

    return (
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl">Manage Teachers</h1>
            <p className="text-sm text-fuchsia-200">
              View, add, edit, and remove faculty members.
            </p>
          </div>

          <button
          
          onClick={()=>{
            setModaltype('add')
            setSelectedTeacher(null)
            setForm({
        department_id: '',
        user_id: '',
        phone: '',
        hire_date: '',
        status: 'active',
        role:'teacher'
      })
      setOpenModal(true)
          }}
            
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            + Add teacher
          </button>
        </div>

        {error && (
          <p className="mt-5 text-red-500">
            {error}
          </p>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border shadow-2xl">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-7">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="px-8 py-6">
                    #{teacher.id}
                  </td>

                  <td>
                    {teacher.User.firstName} {teacher.User.lastName}
                  </td>

                  <td>
                    {teacher.User.email}
                  </td>

                  <td>
                    {teacher.department.department_field}
                  </td>

                  <td>
                    {teacher.phone}
                  </td>

                  <td>
                    <span className={teacher.status==='active'?"text-green":'text-red'}>
                      {teacher.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={()=>handleDelete(teacher)}
                        className="rounded-lg border px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

              {modaltype === 'delete' ? (
                <>
                  <h2 className="text-2xl font-bold">
                    Delete Teacher
                  </h2>

                  <p className="mt-3">
                    Are you sure you want to delete{' '}
                    <strong>
                      {selectedTeacher?.User?.firstName}{' '}
                      {selectedTeacher?.User?.lastName}
                    </strong>
                    ?
                  </p>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={()=>setOpenModal(false)}
                      className="rounded-lg border px-4 py-2"
                    >
                      Cancel
                    </button>

                    <button onClick={handleConfirmDelete} className="rounded-lg bg-red-600 px-4 py-2 text-white">
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">
                    {modaltype === 'add'
                      ? 'Add Teacher'
                      : 'Edit Teacher'}
                  </h2>

                  <div className="mt-6 space-y-4">

                    <div>
                      <label>Department ID</label>
                      <input
                        name="department_id"
                        value={form.department_id}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border p-3"
                      />
                    </div>

                    <div>
                      <label>User ID</label>
                      <input
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border p-3"
                      />
                    </div>

                    <div>
                      <label>Phone</label>
                      <input
                        name="phone"
                        value={form.phone }
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border p-3"
                      />
                    </div>

                    <div>
                      <label>Hire Date</label>
                      <input
                        type="date"
                        name="hire_date"
                        value={form.hire_date}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border p-3"
                      />
                    </div>

                    <div>
                      <label>Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border p-3"
                      >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                        <option value="vacation">vacation</option>
                      </select>
                    </div>

                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={()=>setOpenModal(false)}
                      className="rounded-lg border px-4 py-2"
                    >
                      Cancel
                    </button>

                    <button onClick={modaltype === 'add' ? handleAdd : handleSave} className="rounded-lg bg-black px-4 py-2 text-white">
                      {modaltype === 'add' ? 'Create' : 'Save'}
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    )
  }