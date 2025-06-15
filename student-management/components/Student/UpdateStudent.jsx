import React,{useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {formatDate} from '../FormatDate'
import Modal from '../Modal'
import { ArrowLeft } from 'lucide-react';
const UpdateStudent = () => {
    const {id} = useParams()

     const [studentInfo,setStudentInfo] = useState({
         firstname:'',
         lastname:'',
         gender:'',
         birthdate:'',
         email:'',
         phone:'',
         address:'',
         dep:'',
         year:'',
         section:'',

         parentName:'',
         parentGender:'',
         parentBirthdate:'',
         parentEmail:'',
         parentPhone:'',
         parentAddress:''
     })
    const [showModal,setShowModal] = useState(false)
    const [error,setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        axios.get(`http://localhost:8081/api/students/get-student/${id}`)
        .then(res => {
          if (res) {  
             setStudentInfo({
                firstname:res.data.first_name,
                lastname:res.data.last_name,
                gender:res.data.gender,
                birthdate:res.data.birthdate,
                email:res.data.email,
                phone:res.data.phone,
                address:res.data.address,
                dep:res.data.department,
                year:res.data.year,
                section:res.data.section,

                parentName:res.data.name,
                parentGender:res.data.parent_gender,
                parentBirthdate:res.data.parent_birthdate,
                parentEmail:res.data.parent_email,
                parentPhone:res.data.parent_phone,
                parentAddress:res.data.parent_address
                
             })
          }
        })
        .catch(error => {
          if (error.response) {
             setError(error.response.data.error)
          }else{
             console.log(error.response.data);
             setError("server is not responding. please try again!")
          }
        })
     },[])


     const handleSubmit = (e) => {
        e.preventDefault()
        if (!studentInfo.firstname || !studentInfo.lastname || !studentInfo.gender || !studentInfo.birthdate || !studentInfo.email || !studentInfo.phone ||  !studentInfo.address || !studentInfo.dep || !studentInfo.year || !studentInfo.section || !studentInfo.parentName || !studentInfo.parentEmail || !studentInfo.parentGender || !studentInfo.parentBirthdate || !studentInfo.parentPhone || !studentInfo.parentAddress){
          alert("Please fill all fields")
        }else{
           axios.put(`http://localhost:8081/api/students/update-student/${id}`,studentInfo)
           .then(res => {
            setShowModal(true)        
           })
           .catch(error => {
            console.log(error);
            
           })
        }
       
     }
  return (
    <div className='pb-10 pt-17 px-3 sm:ml-50 bg-gray-100'>
      <button onClick={() => navigate(-1)}  className="cursor-pointer sm:ml-3 mb-4 flex items-center gap-1 text-blue-700 hover:underline">
         <ArrowLeft size={20} />
         <span className=''>Back</span>
      </button>
    <form onSubmit={handleSubmit}  className='max-w-5xl shadow-sm mx-auto bg-white py-4 sm:ml-3'>
        {/* STUDENT INFO */}
        <h1 className='text-xl text-gray-900 font-semibold pl-3'>Update Student Info</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3  px-4 py-7 '>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>First Name:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter First Name'
                 name='firstname'
                 onChange={(e) => setStudentInfo({...studentInfo,firstname:e.target.value})}
                 value={studentInfo.firstname}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Last Name:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter First Name'
                 name='lastname'
                 onChange={(e) => setStudentInfo({...studentInfo,lastname:e.target.value})}
                 value={studentInfo.lastname}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700 mr-4'>Gender:</label>
                <select onChange={(e) => setStudentInfo({...studentInfo,gender:e.target.value})} name="gender" className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                    <option value="">{studentInfo.gender}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>BirthDate:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="date" 
                 placeholder='Enter Date of birth'
                 name='birthdate'
                 onChange={(e) => setStudentInfo({...studentInfo,birthdate:e.target.value})}
                 value={formatDate(studentInfo.birthdate)}
                  />
            </div>
   
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Email :</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="email" 
                 placeholder='Enter Email'
                 name='email'
                 onChange={(e) => setStudentInfo({...studentInfo,email:e.target.value})}
                 value={studentInfo.email}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Phone Number:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="number" 
                 placeholder='Enter Phone Number'
                 name='phone'
                 onChange={(e) => setStudentInfo({...studentInfo,phone:e.target.value})}
                 value={studentInfo.phone}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Address:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter Your Address'
                 name='address'
                 onChange={(e) => setStudentInfo({...studentInfo,address:e.target.value})}
                 value={studentInfo.address}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Department:</label>
                <select onChange={(e) => setStudentInfo({...studentInfo,dep:e.target.value})} name="dep" className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                        <option value="">{studentInfo.dep}</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="CSE">CSE</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Information Technology">Information Technology</option>
                 </select>
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Year:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="number" 
                 min="0"  
                 placeholder='Enter Year'
                 name='year'
                 onChange={(e) => setStudentInfo({...studentInfo,year:e.target.value})}
                 value={studentInfo.year}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Section:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="number" 
                 min="1"  
                 placeholder='Enter Your section'
                 name='section'
                 onChange={(e) => setStudentInfo({...studentInfo,section:e.target.value})}
                 value={studentInfo.section}
                  />
            </div>

        </div>

        {/* PARENT INFO */}
        <h1 className='text-xl text-gray-950 font-semibold pl-3'>Update Parent Info</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3  px-4 py-7 '>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Full Name:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter full Name'
                 name='parentName'
                 onChange={(e) => setStudentInfo({...studentInfo,parentName:e.target.value})}
                 value={studentInfo.parentName}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700 mr-4'>Gender:</label>
                <select  onChange={(e) => setStudentInfo({...studentInfo,parentGender:e.target.value})} name="parentGender" className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                    <option value="">{studentInfo.parentGender}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>BirthDate:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="date" 
                 placeholder='Enter Date of birth'
                 name='parentBirthdate'
                 onChange={(e) => setStudentInfo({...studentInfo,parentBirthdate:e.target.value})}
                 value={formatDate(studentInfo.parentBirthdate)}
                  />
            </div>
   
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Email :</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="email" 
                 placeholder='Enter Email'
                 name='parentEmail'
                 onChange={(e) => setStudentInfo({...studentInfo,parentEmail:e.target.value})}
                 value={studentInfo.parentEmail}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Phone Number:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="number" 
                 placeholder='Enter Phone Number'
                 name='parentPhone'
                 onChange={(e) => setStudentInfo({...studentInfo,parentPhone:e.target.value})}
                 value={studentInfo.parentPhone}
                  />
            </div>
            <div className=''>
                <label htmlFor="" className='font-semibold text-gray-700'>Address:</label>
                <input className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2 placeholder:text-sm focus:outline-blue-600'
                 type="text" 
                 placeholder='Enter Address'
                 name='parentAddress'
                 onChange={(e) => setStudentInfo({...studentInfo,parentAddress:e.target.value})}
                 value={studentInfo.parentAddress}
                  />
            </div>
          
        </div>

        <div className='flex items-center pl-4'>
          <button className='px-4 py-2 bg-yellow-500 text-white rounded-sm w-1/4 cursor-pointer hover:bg-yellow-600 duration-150'>Submit</button>
        </div>

        {error && <div className='mt-3 text-red-700 text-md ml-4'>{error}</div>}
    </form>



      {
         showModal && <Modal setShowModal={setShowModal} message="Updated successfully" subMessage = "parent and student updated" />
      }


  
</div>
  )
}

export default UpdateStudent