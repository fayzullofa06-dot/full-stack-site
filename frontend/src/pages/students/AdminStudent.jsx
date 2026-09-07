
  import React, { useEffect, useEffectEvent, useState } from 'react'
  import { getStudents } from '../../api/admin/admin.student'
  import { updateStudents } from '../../api/admin/admin.student'
  import { deleteStudents } from '../../api/admin/admin.student'
  import { Department } from '../../api/admin/admin.department'
  import { createStudents } from '../../api/admin/admin.student'
  export const AdminStudent = () => {
    const [students, setStudent] = useState([])
    const [error, setError] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [modaltype, setModaltype] = useState('')
    const [department,setDepartment]=useState([])
  const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
      user_id: '',
      department_id: '',
      phone: '',
      dateOfBirth: 0,
      status: 'active',
      role: 'student'
    })

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

  /*   useEffect(() => {
      async function student() {
        try {
          setError('')

          const data = await getStudents()

          setStudent(data.data)

          console.log(data.data)
        } catch (error) {
          console.error(error.message)
          setError(error.message)
        }
      }

      student()
    }, []) */
    useEffect(() => {
      
  async function loadData(){
    try {
      setLoading(true)
      const [studentsData,departmentData]= await Promise.all([
        getStudents(),
        Department(),
      ])
      setStudent(studentsData.data)
      setDepartment(departmentData.data)
    } catch (error) {
            console.error(error.message)
        setError(error.message)

      
    }finally{
      setLoading(false)
    }
  }
    loadData()
    }, [])
    

    async function handleSaveChanges() {
      try {
        console.log("FORM:", form)
console.log("DEPARTMENT ID:", form.department_id)
console.log("ALL DEPARTMENTS:", department)
         await updateStudents({
          id: selectedStudent.id,
          ...form//also we can do so   await updateStudents({
  /* id: selectedStudent.id,
  user_id: form.user_id,
  phone: form.phone,
  dateOfBirth: form.dateOfBirth,
  status: form.status,
  role: form.role
}) */
        })

        const selectedDepartment=department.find(val=>val.id===Number(form.department_id))
        console.log("OLD STUDENTS:", students)

  console.log("SELECTED DEPARTMENT:", selectedDepartment)
      const data1 = await getStudents()
        
      setStudent(data1.data)

        setOpenModal(false)
        setSelectedStudent(null)

      } catch (error) {
        setError(error.message)
      }
    }

    
    const handleEdit = (student) => {
      setSelectedStudent(student)
setForm({
    user_id: student.user_id ?? '',
    department_id: student.department_id || student.department?.id || '',
    phone: student.phone ?? '',
    dateOfBirth: student.dateOfBirth ?? '',
    status: student.status ?? 'active',
    role: student.role ?? 'student'
  })

      setModaltype('edit')
      setOpenModal(true)
    }

    
    const handleDelete = async() => {
  try {
    await deleteStudents(selectedStudent.id)
    setStudent(prev=>prev.filter(value=>value.id!==selectedStudent.id))
    setOpenModal(false)
    setSelectedStudent(null)
  } catch (error) {
    console.log(error)
    setError(error.message)

  }    
    }

    const openDeleteModal = (student) => {
      setSelectedStudent(student)
      setModaltype('delete')
      setOpenModal(true)
    }


    const handleAdd = async() => {

  try {
      const data=await createStudents(form)
      setStudent(prev=>[...prev,data.data])
    setForm({
      user_id: '',
      department_id: '',
      phone: '',
      dateOfBirth: '',
      status: 'active',
      role: 'student'
    })
    setOpenModal(false)
  } catch (error) {
    console.error(error.message)
    setError(error.message)
  }
    
      
    }

    const openAddModal = () => {
      setSelectedStudent(null)

      setForm({
        user_id: '',
        department_id: '',
        phone: '',
        dateOfBirth: '',
        status: 'active',
        role: 'student'
      })

      setModaltype('add')
      setOpenModal(true)
    }
    

    const sortedStudents = [...students].sort(
      (a, b) => a.id - b.id
    )

    return (
      <div> 

        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl">
              Manage Students
            </h1>

            <p className="text-sm text-fuchsia-200">
              View, add, edit, and remove students.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            + Add student
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
                <th>Date of Birth</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {sortedStudents.map((student) => (

                <tr
                  key={student.id}
                  className="border-b transition hover:bg-gray-50"
                >

                  <td className="px-8 py-6">
                    {student.id}
                  </td>



                  <td>
                    {student.User
                      ? `${student.User.firstName} ${student.User.lastName}`
                      : 'No user'}
                  </td>


                  <td>
                    {student.User?.email || 'No email'}
                  </td>


                  <td>
                    {student.department
                      ? student.department.department_field
                      : 'No department'}
                  </td>


                  <td>
                    {student.phone??'No phone'}
                  </td>


                  <td>
                    {student.dateOfBirth??  'date of birth is not included'}
                  </td>


                  <td>
                    <span className={student.status=='active'?'text-green-300':'text-red-500'}>
                      {student.status}
                    </span>
                  </td>


                  <td>
                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(student)}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openDeleteModal(student)}
                        className="rounded-lg border px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}


          {loading ? (
    <tr>
      <td
        colSpan="8"
        className="py-10 text-center text-gray-500"
      >
        Loading students...
      </td>
    </tr>
  ) : students.length === 0 ? (
    <tr>
      <td
        colSpan="8"
        className="py-10 text-center text-gray-500"
      >
        No students found.
      </td>
    </tr>
  ) : null}

            </tbody>

          </table>
        </div>



        {openModal && modaltype === 'edit' && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Edit Student
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update student information
                  </p>
                </div>

                <button
                  onClick={() => setOpenModal(false)}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>


              <div className="space-y-4">

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    User ID
                  </label>

                  <input
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Department ID
                  </label>

                <select name="department_id" value={form.department_id} onChange={handleChange} className='w-full rounded-xl border px-4 py-3
  '>
    <option  className='w-full rounded-xl border px-4 py-3"'value="">Select Department
      </option>
      {department.map((value)=>(
        <option key={value.id} value={value.id}>
          {value.department_field}
        </option>
      ))}
    op
  </select>
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

              </div>


              <div className="mt-7 flex justify-end gap-3">

                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-xl border px-5 py-3 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveChanges}
                  className="rounded-xl bg-black px-5 py-3 text-sm text-white"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>
        )}



        {openModal && modaltype === 'delete' && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

              <h2 className="text-2xl font-semibold text-gray-900">
                Delete Student
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this student?
                This action cannot be undone.
              </p>


              <div className="mt-5 rounded-xl bg-gray-50 p-4">

                <p className="text-sm text-gray-500">
                  Student
                </p>

                <p className="font-medium text-gray-900">
                  {selectedStudent?.User
                    ? `${selectedStudent.User.firstName} ${selectedStudent.User.lastName}`
                    : 'Unknown student'}
                </p>

                <p className="text-sm text-gray-500">
                  ID: #{selectedStudent?.id}
                </p>

              </div>


              <div className="mt-7 flex justify-end gap-3">

                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-xl border px-5 py-3 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm text-white"
                >
                  Delete Student
                </button>

              </div>

            </div>

          </div>
        )}



        {openModal && modaltype === 'add' && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Add Student
                  </h2>

                  <p className="text-sm text-gray-500">
                    Create a new student
                  </p>
                </div>

                <button
                  onClick={() => setOpenModal(false)}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>


              <div className="space-y-4">

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    User ID
                  </label>

                  <input
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                    placeholder="Enter user ID"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Department ID
                  </label>

                  <input
                    name="department_id"
                    value={form.department_id}
                    onChange={handleChange}
                    placeholder="Enter department ID"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>


                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

              </div>


              <div className="mt-7 flex justify-end gap-3">

                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-xl border px-5 py-3 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  className="rounded-xl bg-black px-5 py-3 text-sm text-white"
                >
                  Add Student
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    )
  }