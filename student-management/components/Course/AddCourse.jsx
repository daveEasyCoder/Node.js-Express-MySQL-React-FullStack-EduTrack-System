import axios from 'axios'
import React, { useEffect,useState } from 'react'

const AddCourse = () => {

    const [teachers,setTeachers] = useState([])
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")


    const[course,setCourse] = useState({
        course_name:"",
        course_id:"",
        description:"",
        credit_hour:"",
        teacher_id:""
    })
    
    useEffect(() => {

        axios.get("http://localhost:8081/api/teachers/teacher-list")
        .then(res => {
            if(res) setTeachers(res.data)
        })
        .catch(error => {
            if(error.response){
                setError(error.response.data.error)
            }else{
                setError("Server is not responding. please try again!")
            }
        })
    },[])


    const handleChange = e => {
        setCourse({
            ...course,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage("") // to clear the message if it contain prev message
        if(!course.course_name || !course.course_id || !course.description || !course.credit_hour || !course.teacher_id){
            alert("Please fill all fields!")
        }else{

            axios.post("http://localhost:8081/api/courses/add-course",course)
            .then(res => {
                 if(res.status === 201){
                    alert("course added") 
                    setCourse({
                        course_name:"",
                        course_id:"",
                        description:"",
                        credit_hour:"",
                        teacher_id:""
                    })   
                 }
                  
            })
            .catch(error => {
                if (error.response ) {
                    setMessage(error.response.data.error)    
                }else{
                    setMessage("server not responding. please try later!")
                }
                setCourse({
                    course_name:"",
                    course_id:"",
                    description:"",
                    credit_hour:"",
                    teacher_id:""
                })  
            })
        }
    }

  return (
    <div className='pb-10 pt-20 sm:ml-50 min-h-screen bg-gray-100'>
    <h1 className='m-auto mb-2 text-xl text-gray-900 font-bold mx-3'>Add Course</h1>
    <form onSubmit={handleSubmit} className='max-w-4xl mx-3 bg-white pb-8 shadow-sm'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3  px-4 py-7 '>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Course Name:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter Course Name'
                 name='course_name'
                 value={course.course_name}
                 onChange={(e) => handleChange(e)}
                  />
            </div>

            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Course ID :</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter course ID'
                 name='course_id'
                 value={course.course_id}
                 onChange={(e) => handleChange(e)}
                  />
            </div>


            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Course Description:</label>
                <textarea className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Course Description ...'
                 name='description'
                 value={course.description}
                 onChange={(e) => handleChange(e)}
                  />
            </div>

            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Credit Hour:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Credit Hour'
                 name='credit_hour'
                 value={course.credit_hour}
                 onChange={(e) => handleChange(e)}
                  />
            </div>
    
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700 mr-4'>Select Teacher for this course:</label>
                <select onChange={(e) => handleChange(e)}  name="teacher_id" value={course.teacher_id} className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                    <option value="">Select Teacher</option>
                    {
                       teachers && teachers?.length &&
                       teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                       )) 
                    }
                </select>
            </div>

        </div>
              <div className='flex items-center pl-4'>
                <button type='submit' className='px-10 text-sm py-1 bg-yellow-500 text-white rounded-sm cursor-pointer hover:bg-yellow-600'>Submit</button>
             </div>
             {message && <p className='ml-4 mt-3 text-sm text-red-600'>{message}</p>}
    </form>
</div>
  )
}

export default AddCourse