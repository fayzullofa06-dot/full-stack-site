import React, { useEffect, useState } from 'react'
import { getUsersAll } from '../../api/admin/admin.users'
import { Link } from 'react-router-dom'
import { getStudents } from '../../api/admin/admin.student'
import { asadosgandos } from '../../api/admin/admin.teachers'
import { useAuth } from '../../../routes/AuthContex'
import { totalCourses } from '../../api/admin/admin.course'
import { Classroom } from '../../api/admin/admin.totalClassroom'
import { Enrollments } from '../../api/admin/admin.totalEnrollments'
import { Department } from '../../api/admin/admin.department'
export const AdminDashboard = () => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalStudents,settotalStudents]=useState([])
  const [totalTeachers,setTotalTeachers]=useState([])
  const[totalCourse,setTotalCourses]=useState([])
  const [totalClassrooms,setTotalClassrooms]=useState([])
  const [totalEnrollments,setEnroll]=useState([])
  const [totalDepartment,setTotalDepartment]=useState([])


/*   useEffect(() => {
    async function fetchUsersAll() {
      try {
        setLoading(true)
        setError('')

        const data = await getUsersAll()

        console.log("My users:", data)

        setUser(data.data)

      } catch (error) {
        console.error('failed to getUsers', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsersAll()
  }, [])
  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true)
        setError('')

        const data = await getStudents()

     settotalStudents(data.data)
      } catch (error) {
        console.error('failed to getStudents', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])
  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true)
        setError('')

        const data = await asadosgandos()

     setTotalTeachers(data.data)
      } catch (error) {
        console.error('failed to Teachers', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])
  useEffect(() => {
    async function fetchTotalCourse() {
      try {
        setLoading(true)
        setError('')

        const data = await totalCourses()
console.log(data)
     setTotalCourses(data.data)
      } catch (error) {
        console.error('failed to getCourses', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalCourse()
  }, [])

  useEffect(()=>{


    async function fetchEnrollments(){
      try {
        setLoading(true)
        setError('')
        const data= await Enrollments()
        console.log(data)
        setEnroll(data.information)
      } catch (error) {
        console.error("failed to take info from backend",error)

        setError(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    fetchEnrollments()

  },[])
  useEffect(()=>{


    async function fetchClassroom(){
      try {
        setLoading(true)
        setError('')
        const data= await Classroom()
        console.log(data)
        setTotalClassrooms(data.data)
      } catch (error) {
        console.error("failed to take info from backend",error)

        setError(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    fetchClassroom()

  },[])
  useEffect(()=>{


    async function fetchDepartment(){
      try {
        setLoading(true)
        setError('')
        const data= await Department()
        console.log(data)
        setTotalDepartment(data.data)
      } catch (error) {
        console.error("failed to take info from backend",error)

        setError(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    fetchDepartment()

  },[]) */
  useEffect(()=>{
    
    
    async function fetchDashboardData(){
      try {
        
    setLoading(true)
    setEnroll('')
    const start = performance.now()

        const [
          userData,
          studentsData,
          teachersData,
          coursesData,
          classroomData,
          enrollmentsData,
          departmentData
        ] = await Promise.all([
          getUsersAll(),
          getStudents(),
          asadosgandos(),
          totalCourses(),
          Classroom(),
          Enrollments(),
          Department()
        ])

        const end = performance.now()

        console.log(
          `Dashboard requests finished in ${(end - start).toFixed(2)}ms`
        )

        setUser(userData.data)
        settotalStudents(studentsData.data)
        setTotalTeachers(teachersData.data)
        setTotalCourses(coursesData.data)
        setTotalClassrooms(classroomData.data)
        setEnroll(enrollmentsData.information)
        setTotalDepartment(departmentData.data)


      } catch (error) {
       console.error(error)
      }
      finally{
        setLoading(false)
      }
    
    }
    fetchDashboardData  ()

  },[])
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Overview of your administration panel
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : user.length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/user"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Students
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : totalStudents.length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/student"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Teachers
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : totalTeachers .length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/teacher"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Course
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : totalCourse .length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/users"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Classrooms
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : totalClassrooms .length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/user"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Departments
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : totalDepartment .length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/users"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Enrollments
              </p>

              <p className="text-3xl font-semibold text-gray-900 mt-3">
                {loading ? '...' : totalEnrollments.length}
              </p>
            </div>

            
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/admin/users"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Manage users →
            </Link>
          </div>
        </div>

      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

    </div>
  )
}