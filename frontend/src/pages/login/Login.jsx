  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { login} from "../../api/user/user.login";
  import { useAuth } from "../../../routes/AuthContex";

  export default function Login() {
    const navigate=useNavigate()
    const {setUser,}=useAuth()
    const[error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const [success,setSuccess]=useState(false)
  const[form,setForm]=useState({
    email:'',
    password:""
  })

  const handleChange=(e)=>{
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
  }

  const handleSubmit=async(e)=>{
  e.preventDefault()
  setError('')
  setLoading(true)
  try {
    const data= await login(form)
    setSuccess(true)
    console.log('Login response',data)
    
    

    localStorage.setItem('token',data.token)
    console.log("LOGIN ROLE:", data.info.role);
console.log("USER SENT TO CONTEXT:", data.info);

    setUser(data.info)
    if(data.info.role==='admin'){
        console.log("GOING TO ADMIN");

      return navigate('/admin/dashboard',{replace:true})
    }
  else if(data.info.role==='teacher'){
    return navigate('teacher/dashboard',{replace:true})
  }

      else{

         navigate('/main/dashboard',{replace:true})
      }
    
  } catch (error) {
    console.error('failed to login',error)
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
            Login
          </h1>

          <p className="text-gray-500 mb-6">
            Login to your account
          </p>

          {error && (
            <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
              {error}
            </p>
          )}

  {success && (
    <div className="mb-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
    

      <div>
        <p className="font-semibold">Login successful!</p>
        <p className="text-sm text-green-600">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  )}
          <div className="mb-4">
            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/sign")}
            className="mt-4 w-full text-blue-600"
          >
            Don't have an account? Sign up
          </button>

        </form>

      </div>
    );
  }