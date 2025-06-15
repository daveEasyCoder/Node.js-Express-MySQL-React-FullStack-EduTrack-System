import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
const UpdateCourse = () => {

  const { id } = useParams()

  const [teachers,setTeachers] = useState([])
  const [error,setError] = useState("")
 const navigate = useNavigate()
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



      axios.get(`http://localhost:8081/api/courses/get-course/${id}`)
      .then(res => {
        if(res){        
            setCourse({
                course_name:res.data.course_name,
                course_id:res.data.course_id,
                description:res.data.desctiption,
                credit_hour:res.data.credit_hour,
                teacher_id:res.data.teacher_id
            })
        } 
      })
      .catch(error => {
        console.log(error);
        
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
    if(!course.course_name || !course.course_id || !course.description || !course.credit_hour){
        alert("Please fill all fields!")
    }else{
        
        axios.put(`http://localhost:8081/api/courses/update-course/${id}`,course)
        .then(res => {
             if(res){
                alert("course upddated")    
             }
              
        })
        .catch(error => {
            if (error.response ) {
                setError(error.response.data.error)  
                console.log(error);
                  
            }else{
                setError("server not responding. please try later!")
            }
        })
    }
}


const teacherObj = teachers.find(t => t.id === Number(course.teacher_id))
 

  return (
    <div className='pb-10 pt-20 sm:ml-50 min-h-screen  bg-gray-100'>
      <button onClick={() => navigate(-1)}  className="cursor-pointer ml-3 mb-4 flex items-center gap-1 text-blue-700 hover:underline">
        <ArrowLeft size={20} />
        <span className=''>Back</span>
    </button>
    <h1 className='max-w-5xl mx-3 mb-2 text-xl text-gray-900 font-bold'>Update Course</h1>
    <form onSubmit={handleSubmit} className='max-w-5xl mx-3 bg-white pb-8 shadow-sm'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3  px-4 py-7 '>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Course Name:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter Course Name'
                 name='course_name'
                 onChange={(e) => handleChange(e)}
                 value={course.course_name}
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
                <select onChange={(e) => handleChange(e)}  name="teacher_id" className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                    <option value="">{teacherObj?.name ? teacherObj?.name : 'Null'}</option>
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
                <button className='px-10 text-sm py-1 bg-blue-700 text-white rounded-sm cursor-pointer hover:bg-blue-800'>Submit</button>
             </div>
             {error && <p className='ml-4 mt-3 text-sm text-red-600'>{error}</p>}
    </form>
</div>
  )
}

export default UpdateCourse