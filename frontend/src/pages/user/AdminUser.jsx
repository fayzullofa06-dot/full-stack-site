  import React, { useState,useEffect } from 'react'

  import { createUser, getAllUsers,updateUser ,deleteUser} from '../../api/admin/admin.user'
  export const AdminUser = () => {
      const [user,setUser]=useState([])
      const [error,setError]=useState('')
      const [openModal,setOpenModal]=useState(false)
      const [modalType,setModalType]=useState('')
      const [selectedUser, setSelectedUser] = useState(null)
      const [form,setForm]=useState({
          email:'',
          firstName:"",
          lastName:"",
          password:"",
          role:'user'
      })

      useEffect(() => {
        async function getUsers() {
          try {
              setError('')
              const data= await getAllUsers()
              console.log(data)
              setUser(data.data)
              
          } catch (error) {
              console.log(error.message)
              setError(error.message)         
          
          }
        }
        getUsers()
    
      }, [])
  const sortedUSers=[...user].sort((a,b)=>a.id-b.id)

      const handleAdd= async()=>{
    localStorage.getItem('token')
          try {
              const data= await createUser(form)
            
              setUser(prev=>[...prev,data.data])
              
              setForm({
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName, 
                role:user.role
              })
              setModalType('create')
              setOpenModal(false)


              
          } catch (error) {
            console.error(error.message)
            setError(error.message)
              
          }
      }
      const handlesaveChanges =async()=>{
try {
   await updateUser({
    id:selectedUser.id,
    email:form.email,
    firstName:form.firstName,
    lastName:form.lastName,
    role:form.role
   })
   const data= await getAllUsers()
   setUser(data.data)
       setOpenModal(false)
    setSelectedUser(null)
} catch (error) {
  console.error(error.message)
  setError(error.message)
}
      }
      const openCreateModal=()=>{
        setModalType('create')
        setOpenModal(true)
      }
      const openEditModal=(user)=>{
        setSelectedUser(user)
        setForm({
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName,
          role:user.role
        })
        setModalType('edit')
        setOpenModal(true)
      }


const removeData=async()=>{
  try {
   await deleteUser(selectedUser.id)
   setUser(prev=>prev.filter(user=>user.id!==selectedUser.id))
   setOpenModal(false)
   setSelectedUser(null)
  } catch (error) {
    console.log(error)
    setError(error.message)
  }
}
const openDeleteModal=(user)=>{
  setSelectedUser(user)
  setModalType('delete')
  setOpenModal(true)
  console.log(user)
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
      <h1 className='text-2xl'>Manger Users</h1>
      <p> View, add, edit, and remove faculty members.</p>
    </div>
    <button onClick={openCreateModal} className='border-1 rounded-xl p-3 bg-black text-white'> + Add student</button>


              </div>
    <div className="mt-8 overflow-hidden rounded-2xl border shadow-2xl">

    <table className="w-full text-center">

      <thead>
        <tr>
          <th className="py-7">Id</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {sortedUSers.map((user) => (
          <tr
            key={user.id}
            className="border-b transition hover:bg-gray-50"
          >

            <td className="px-8 py-6">
              {user.id}
            </td>

            <td className="px-8 py-6">
              {user.email}
            </td>

            <td className="px-8 py-6">
              {user.firstName ?? "no user found"}
            </td>

            <td className="px-8 py-6">
              {user.lastName ?? "No lastName"}
            </td>

            <td className="px-8 py-6">
              <span className={user.role==='admin'?'text-red-900':'text-black'}>
                {user.role} 
              </span>
            </td>

            <td className="px-8 py-6">
              <div className="flex gap-2">

                <button
                onClick={()=>openEditModal(user)}
                  className="rounded-lg border px-3 py-2 text-sm"
                >
                  Edit
                </button>

                <button
                onClick={()=>openDeleteModal(user)}
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
    {modalType === 'create' && openModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Create User
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new user to the system.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="rounded-lg px-3 py-2 text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={(e)=>e.preventDefault()} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e)=>setForm({
                ...form,
                [e.target.name]:e.target.value
              })
              }
              placeholder="user@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={(e)=>setForm({
                ...form,
                [e.target.name]:e.target.value
              })
              }
              placeholder="Habibullo"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={(e)=>setForm({
                ...form,
                [e.target.name]:e.target.value
              })
              }
              placeholder="lastName"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  [e.target.name]: e.target.value
                })
              }
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">

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
              Create User
            </button>

          </div>

        </form>
      </div>
    </div>
  )}
  {modalType === 'edit' && openModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">

        <div className="mb-6 flex items-start justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Edit User
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the user's account information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="rounded-lg px-3 py-2 text-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            ×
          </button>

        </div>


        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e)=>setForm({
                ...form,
                [e.target.name]:e.target.value
              })}
          
              placeholder="user@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>


          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={(e)=>setForm({
                ...form,
                [e.target.name]:e.target.value
              })}
                placeholder="First name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={(e)=>setForm({
                  ...form,
                  [e.target.name]:e.target.value 
                })}
                placeholder="Last name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
              />
            </div>

          </div>


          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={(e)=>setForm({
                ...form,
                [e.target.name]:e.target.value
              })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            >
              <option value="student">student</option>
              <option value="admin">Admin</option>
              <option value="teacher">teacher</option>
            </select>
          </div>


          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handlesaveChanges}
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    

    </div>
  )}
    {openModal &&modalType==='delete'&&(
        <div className=' fixed inset-0 flex justify-center items-center  bg-black/50 px-4'>
          <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl'>
 <h2>Delete students</h2>
 <p className='mt-2 text-sm text-gray-500'>
  Are you sure you want to delete this student? This action cannot be undone
 </p>
 <div className='mt-5 rounded-xl bg-gray-50 p-4'>
  <p className='text-sm text-gray-500'>Student FirstName</p>
  <p className='font-medium text-gray-900'>
    {selectedUser?.firstName? selectedUser.firstName:'Unknown firstName'}
  </p>
 
 
 </div>
 <div className='mt-5 rounded-xl bg-gray-50 p-4'>
  <p className='text-sm text-gray-500'>Student lastName</p>
 
  <p className='font-medium text-gray-900'>
    {selectedUser?.lastName? selectedUser.lastName:'Unknown lastName'}
  </p>
 
 </div>
 <div className='mt-5 rounded-xl bg-gray-50 p-4'>
  <p className='text-sm text-gray-500'>Student Email</p>
 
  <p className='font-medium text-gray-900'>
    {selectedUser?.email? selectedUser.email:'Unknown email'}
  </p>
 
 </div>
 <div className='mt-5 rounded-xl bg-gray-50 p-4'>
  <p className='text-sm text-gray-500'>Student Email</p>
 
  <p className='font-medium text-gray-900'>
    {selectedUser?.role? selectedUser.role:'Unknown role'}
  </p>
 
 </div>
 <div className=' mt-4 flex gap-3 justify-end'>
  <button onClick={()=>setOpenModal(false)} className='rounded-xl border px-5 py-3 text-sm'>Cancel</button>
  <button className='rounded-xl bg-red-600 px-5 py-3 text-sm text-white' onClick={removeData}>Delete User</button>
 </div>
          </div>
        </div>
      )}
      </div> 
    )
  }
