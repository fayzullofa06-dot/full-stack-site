  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { register } from "../../api/user/user.register";
  import { useAuth } from "../../../routes/AuthContex";

  export default function Signup() {
  const navigate=useNavigate()
  const {setUser  }=useAuth
  const [form,setForm]=useState({
    email:'',
    password:'',
    firstName:"",
  lastName:""
  })
  const [error,setError]=useState('')
  const [success,setSuccess]=useState(false)
  const [loading,setLoading]=useState(false)
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
  e.preventDefault()
  setLoading(true)
  setError('')
    try {
      const enter= await register(form)
    console.log('register response',enter)
    
     
    if(enter){
      setSuccess(true)
      setTimeout(() => {
      
        navigate('/')
      }, 1000);
    }
    else{
      setSuccess(false)
    }
    } catch (error) {
      console.log("failed to register",error)
      setError(error.message)
    }
    finally{
      setLoading(false)
    }
  }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        >

          <h1 className="text-3xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-gray-500 mb-6">
            Register as a student
          </p>

          {error && (
            <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-600">
              {success}
            </p>
          )}

          <div className="mb-4 grid grid-cols-2 gap-3">

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="rounded-lg border p-3"
            />

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="rounded-lg border p-3"
            />

          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="mb-6 w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full text-blue-600"
          >
            Already have an account? Login
          </button>

        </form>

      </div>
    );
  }