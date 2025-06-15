import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from 'lucide-react';
const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const[detailInfo,setDetailInfo] = useState({})
  const [error,setError] = useState("")
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/students/get-student/${id}`)
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


  if(error) return <div className="ml-60 pt-20 text-gray-800">{error}</div>
  
  return (
    <div className="bg-gray-100 px-3 sm:px-0 sm:ml-50 min-h-screen pt-20 pb-5">
      <button onClick={() => navigate(-1)} className="cursor-pointer ml-3 mb-4 flex items-center gap-1 text-green-700 hover:underline">
         <ArrowLeft size={20} />
         <span className=''>Back</span>
      </button>
      <div className="max-w-5xl mx-auto p-6 bg-white sm:ml-3">
        <h1 className="text-3xl font-bold mb-6 pl-4 border-b-1 border-b-gray-300 py-4">
          Student Details
        </h1>

        {/* Student Section */}
        <div className="py-6 sm:p-6 flex flex-col sm:flex-row gap-5 border-b-1 border-b-gray-200">
          <div className="">
            <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-semibold text-gray-500 overflow-hidden">
               <img src="/profile_pic.png" alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 flex-1 max-w-70 sm:max-w-md md:max-w-xs">
            <div className="stud-info">
              <p className="font-bold">Name</p>
              <p className="text-gray-600 font-semibold">{detailInfo.first_name} {detailInfo.last_name}</p>
            </div>
            <div className="stud-info">
              <p className="font-bold">Gender</p>
              <p className="text-gray-600 font-semibold">{detailInfo.gender}</p>
            </div>
            <div className="stud-info">
              <p className="font-bold">Email</p>
              <p className="text-gray-600 font-semibold">{detailInfo.email}</p>
            </div>
            <div className="stud-info">
              <p className="font-bold">Phone</p>
              <p className="text-gray-600 font-semibold">{detailInfo.phone}</p>
            </div>
            <div className="stud-info">
              <p className="font-bold">Address</p>
              <p className="text-gray-600 font-semibold">{detailInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="bg-white rounded-2xl py-6 sm:p-6 mt-4">
          <h3 className="text-xl font-semibold mb-6">Academic Information</h3>
          <div className="flex flex-col gap-3 border-b-1 border-b-gray-200 pb-8">
            <div className="academic-info sm:w-[55%]">
              <div className="font-bold text-gray-900">Department</div>
              <div className="font-semibold text-gray-700 text-sm">
                {detailInfo.department}
              </div>
            </div>
            <div className="academic-info sm:w-[55%]">
              <div className="font-bold text-gray-900">Year</div>
              <div className="font-semibold text-gray-700 text-sm">{detailInfo.year}</div>
            </div>
            <div className="academic-info sm:w-[55%]">
              <div className="font-bold text-gray-900">Section</div>
              <div className="font-semibold text-gray-700 text-sm">{detailInfo.section}</div>
            </div>
          </div>
        </div>

        {/* Parent Info */}

        <div className="bg-white py-6 sm:p-6">
          <h3 className="text-xl font-semibold mb-5">Parent Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> {detailInfo.name}
            </p>
            <p>
              <strong>Gender:</strong> {detailInfo.parent_gender}
            </p>
            <p>
              <strong>Birthdate:</strong> {detailInfo.parent_birthdate}
            </p>
            <p>
              <strong>Email:</strong> {detailInfo.parent_email}
            </p>
            <p>
              <strong>Phone:</strong> {detailInfo.parent_phone}
            </p>
            <p>
              <strong>Address:</strong> {detailInfo.parent_address}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-center mt-8 gap-4">
          <Link to={`/student/update/${id}`} className="bg-green-700 text-white px-6 py-1.5 text-sm rounded-sm  hover:bg-green-800 duration-150">
            Edit
          </Link>
          <Link to = "/students" className="bg-gray-300 px-6 py-1.5 rounded-sm text-sm hover:bg-gray-400">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
