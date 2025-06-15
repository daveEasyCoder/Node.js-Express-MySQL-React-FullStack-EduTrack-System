import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
const TeacherDetail = () => {
    const {id} = useParams()
    const[detailInfo,setDetailInfo] = useState({})
    const[error,setError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
      axios
        .get(`http://localhost:8081/api/teachers/get-teacher/${id}`)
        .then((res) => {
          if (res) {
            setDetailInfo(res.data)
          }
        })
        .catch((error) => {
          if (error.response) {
            //  console.log(error.response.data);
            setError(error.response.data.error);
          } else {
            console.log(error.response.data);
            setError("server is not responding. please try again!");
          }
        });
    }, []);

    console.log(detailInfo);
    
  return (
    <div className="min-h-screen bg-gray-100 sm:ml-50 pt-20">
      <button onClick={() => navigate(-1)}  className="cursor-pointer ml-3 mb-4 flex items-center gap-1 text-yellow-600 hover:underline">
        <ArrowLeft size={20} />
        <span className=''>Back</span>
     </button>
    <div className="bg-white shadow-sm rounded-sm max-w-sm p-6 ml-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-b-gray-300 pb-2">Teacher Profile</h2>
      <div className="space-y-4 text-gray-700 mb-4">
        <div>
          <span className="font-semibold">Name:</span> {detailInfo.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {detailInfo.email}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {detailInfo.phone}
        </div>
        <div>
          <span className="font-semibold">Gender:</span> {detailInfo.gender}
        </div>
        <div>
          <span className="font-semibold">Address:</span> {detailInfo.address}
        </div>
        <div>
          <span className="font-semibold">Qualification:</span> {detailInfo.qualification}
        </div>
        <div>
          <span className="font-semibold">Subject Speciality:</span> {detailInfo.subject_speciality}
        </div>
      </div>
      <Link to={`/teacher/update/${id}`} className='px-12 py-1.5 bg-yellow-500 rounded-sm hover:bg-yellow-600 duration-150 text-sm text-white'>Edit</Link>
    </div>
  </div>
  )
}

export default TeacherDetail