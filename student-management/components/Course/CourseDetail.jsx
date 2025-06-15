import React, { useEffect, useState } from 'react'
import { BookOpen, User, Info, Clock } from "lucide-react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CourseDetail = () => {

    const { id } = useParams()

   const navigate = useNavigate()
   const [course,setCourse] = useState([])
   const [error,setError] = useState("")
   const[loading,setLoading] = useState(false)

   useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:8081/api/courses/get-course/${id}`)
    .then(res => {
      if(res.data){
          setCourse(res.data)
          setLoading(false)
      } 
    })
    .catch(error => {
      if (error.response) {
        setError(error.response.data.error)
        setLoading(false)
      }else{
        setError("server is not responding. please try later!")
        setLoading(false)
      }
      
    })

   },[])


   

   if(loading) return <div className="h-[90vh] flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                     </div>

  return (
        <div className='sm:ml-50 pt-20 bg-gray-100 min-h-screen'>
           {
            error ? <div className='text-center mt-20 text-gray-700 font-medium'>{error}</div> : 
            <div className=''>
            <button onClick={() => navigate(-1)}  className="cursor-pointer ml-3 mb-4 flex items-center gap-1 text-blue-700 hover:underline">
                <ArrowLeft size={20} />
                <span className=''>Back</span>
            </button>
            <div className="p-6 max-w-4xl ml-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="text-indigo-600" size={28} /> {course.course_name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div>
                <p className="text-gray-500 text-sm">Course Code</p>
                <p className="text-lg font-medium text-gray-900">{course.course_id}</p>
            </div>

            <div>
                <p className="text-gray-500 text-sm">Credit Hour</p>
                <p className="text-lg font-medium text-gray-900 flex items-center gap-1">
                <Clock className="text-blue-500" size={18} /> {course.credit_hour} Hours
                </p>
            </div>

            <div className="md:col-span-2">
                <p className="text-gray-500 text-sm mb-1">Description</p>
                <p className="text-gray-700 text-base leading-relaxed">
                {course.desctiption || "No description provided for this course."}
                </p>
            </div>

            <div className="md:col-span-2">
                <p className="text-gray-500 text-sm mb-1">Instructor</p>
                <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="text-green-600" size={20} />
                {course.name || "Not assigned"}
                </p>
            </div>
            </div>
            <Link to = {`/courses/update/${id}`} className='py-1 px-8 cursor-pointer text-sm bg-blue-700 hover:bg-blue-800 duration-150  text-white rounded-sm'>Edit</Link>
        </div>
        </div>
           }
        </div>
  )
}

export default CourseDetail