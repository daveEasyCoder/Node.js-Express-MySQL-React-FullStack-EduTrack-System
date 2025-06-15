import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal'
import { ArrowLeft } from 'lucide-react';
const UpdateTeacher = () => {

    const { id } = useParams()
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
    const[showModal,setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get(`http://localhost:8081/api/teachers/get-teacher/${id}`)
          .then((res) => {
            if (res) {
                setTeacherInfo({
                    name:res.data.name,
                    email:res.data.email,
                    phone:res.data.phone,
                    gender:res.data.gender,
                    address:res.data.address,
                    qualification:res.data.qualification,
                    specialization:res.data.subject_speciality
                })
            }
          })
          .catch((error) => {
            if (error.response) {
               console.log(error.response.data);
              setError(error.response.data.error);
            } else {
              console.log(error.response.data);
              setError("server is not responding. please try again!");
            }
          });
      }, []);

    const handleChange = e => {
        setTeacherInfo({
            ...teacherInfo,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

       if (!teacherInfo.name || !teacherInfo.email || !teacherInfo.phone || !teacherInfo.gender || !teacherInfo.address || !teacherInfo.qualification ||  !teacherInfo.specialization) {
        alert("fill all fields")
       }else{
        
          axios.put(`http://localhost:8081/api/teachers/update-teacher/${id}`,teacherInfo)
          .then(res => {
              if(res){  
                setShowModal(true)
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
    <div className='pb-10 pt-20 sm:ml-50  bg-gray-100 min-h-screen'>
      <button onClick={() => navigate(-1)}  className="cursor-pointer ml-3 mb-4 flex items-center gap-1 text-yellow-600 hover:underline">
        <ArrowLeft size={20} />
        <span className=''>Back</span>
    </button>
    <h1 className='max-w-5xl mx-3 mb-2 text-xl text-gray-900 font-bold'>Update Teacher</h1>
    <form onSubmit={handleSubmit} className='max-w-5xl mx-3 m-auto bg-white pb-8 '>
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
                <select onChange={(e) => handleChange(e)}  name="gender" className='w-full px-2 py-1 rounded-sm border-1 border-gray-300 mt-2'>
                    <option value="">{teacherInfo.gender}</option>
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
                <button className='px-10 text-sm py-1 bg-yellow-500 text-white rounded-sm cursor-pointer hover:bg-yellow-600 duration-150'>update</button>
             </div>

             {
              showModal && <Modal setShowModal={setShowModal} message="Updated successfully" subMessage = "Teacher is updated. thank you!" />
             }
    </form>
</div>
  )
}

export default UpdateTeacher