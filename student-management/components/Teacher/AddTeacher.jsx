import React, { useState } from 'react'
import axios from 'axios'
const AddTeacher = () => {
    const[teacherInfo,setTeacherInfo] = useState({
        name:"",
        email:"",
        phone:"",
        gender:"",
        address:"",
        qualification:"",
        specialization:""
    })
    const[error,setError] = useState("")

    const handleChange = e => {
        setTeacherInfo({
            ...teacherInfo,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        
       if (!teacherInfo.name || !teacherInfo.email || !teacherInfo.phone || !teacherInfo.gender || !teacherInfo.address || !teacherInfo.qualification ||  !teacherInfo.specialization) {
        alert("fill all fields")
       }else{
        
          axios.post("http://localhost:8081/api/teachers/add-teacher/",teacherInfo)
          .then(res => {
              if(res){  
                alert(res.data.message)
                setTeacherInfo({
                    name:"",
                    email:"",
                    phone:"",
                    gender:"",
                    address:"",
                    qualification:"",
                    specialization:""
                })
              }
              
          })
          .catch((error) => {
             if(error.response && error.response.data){
                 setError(error.response.data.error);
             }else{
                console.log(error);
                 setError("Server is not responding. Please try again later.");
                 
             }
          })
       }
        
    }
  return (
    <div className='pb-10 pt-20 sm:ml-50  bg-gray-100'>
        <div className='max-w-5xl mx-auto ml-3'>
            <h1 className="text-2xl text-gray-900 font-bold">Add Teacher</h1>
            <p className="text-gray-700 text-sm mb-3">Teacher / <span className="text-gray-500">add teacher</span></p>
        </div>
        <form onSubmit={handleSubmit} className='max-w-5xl m-auto mx-3 bg-white pb-8 shadow-sm'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3  px-4 py-7 '>
                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700'>Teacher Name:</label>
                    <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                     type="text" 
                     placeholder='Enter Name'
                     name='name'
                     value={teacherInfo.name}
                     onChange={(e) => handleChange(e)}
                      />
                </div>

                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700'>Teacher Email :</label>
                    <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                     type="email" 
                     placeholder='Enter Email'
                     name='email'
                     value={teacherInfo.email}
                     onChange={(e) => handleChange(e)}
                      />
                </div>


                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700'>Teacher Phone:</label>
                    <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                     type="number" 
                     placeholder='Enter Phone Number'
                     name='phone'
                     value={teacherInfo.phone}
                     onChange={(e) => handleChange(e)}
                      />
                </div>

        
                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700 mr-4'>Gender:</label>
                    <select onChange={(e) => handleChange(e)}  name="gender" value={teacherInfo.gender} className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
         
       
           
                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700'>Teacher Address:</label>
                    <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                     type="text" 
                     placeholder='Enter Your Address'
                     name='address'
                     value={teacherInfo.address}
                     onChange={(e) => handleChange(e)}
                      />
                </div>
                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700'>Qualification:</label>
                    <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                     type="text" 
                     placeholder='Qualification'
                     name='qualification'
                     value={teacherInfo.qualification}
                     onChange={(e) => handleChange(e)}
                      />
                </div>
                <div className=''>
                    <label htmlFor="" className='font-semibold text-gray-700'>Subject Specialization:</label>
                    <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                     type="text" 
                     placeholder='Subject Specialization'
                     name='specialization'
                     value={teacherInfo.specialization}
                     onChange={(e) => handleChange(e)}
                      />
                </div>
           
         

            </div>
                  <div className='flex items-center pl-4'>
                    <button className='px-10 text-sm py-1 bg-green-800 text-white rounded-sm cursor-pointer hover:bg-green-900'>Submit</button>
                 </div>
        </form>
    </div>
  )
}

export default AddTeacher