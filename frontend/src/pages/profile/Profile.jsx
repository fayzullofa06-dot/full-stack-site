import React, { useEffect, useRef, useState } from "react";
import { getMe } from "../../api/user/user.info";
import { edit } from "../../api/user/user.edit";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  

  const firstNameRef=useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    
  
   if(isModalOpen){
    firstNameRef.current.focus()
   }

  }, [isModalOpen])

  useEffect(() => {
    const handleDown=(e)=>{
     if(e.key==='Escape'){
      setIsModalOpen(false)
     } 
    }
  if(isModalOpen){
    window.addEventListener('keydown',handleDown)
  }


  return ()=>{
    window.removeEventListener('keydown',handleDown)
  }
    
  }, [isModalOpen])
  
  

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMe();

        console.log("My data:", data);

        setUser(data.user);
      } catch (error) {
        console.error("Failed to get user:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const openEditModal = () => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const changing = await edit(form);
   

     

      setUser(changing.data );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to edit profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm font-medium text-gray-800">
            Loading profile...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Getting your information
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-700">
          Failed to load profile
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="max-w-4xl">

        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900">
            Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your personal information.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

          <div className="flex items-center gap-5 border-b border-gray-200 px-7 py-6">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="ml-auto">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                {user.role}
              </span>
            </div>

          </div>

          <div className="px-7 py-6">

            <h3 className="mb-5 text-base font-semibold text-gray-900">
              Personal Information
            </h3>

            <div className="divide-y divide-gray-100">

              <div className="py-4">
                <p className="text-sm text-gray-500">
                  First name
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.firstName}
                </p>
              </div>

              <div className="py-4">
                <p className="text-sm text-gray-500">
                  Last name
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.lastName}
                </p>
              </div>

              <div className="py-4">
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              <div className="py-4">
                <p className="text-sm text-gray-500">
                  Account role
                </p>

                <p className="mt-1 font-medium capitalize text-gray-900">
                  {user.role}
                </p>
              </div>

            </div>

          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-7 py-5">

            <div>
              <p className="text-sm font-medium text-gray-900">
                Account status
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Active
              </p>
            </div>

            <button
              type="button"
              onClick={openEditModal}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Edit Profile
            </button>

          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Profile
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your personal information.
              </p>
            </div>

            <form onSubmit={handleEdit}>

              <div className="space-y-4">

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    First name
                  </label>

                  <input
                    type="text"
                    ref={firstNameRef}
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Last name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-black"
                  />
                </div>

              </div>

              <div className="mt-6 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button

                  type="submit"
                  className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
} 