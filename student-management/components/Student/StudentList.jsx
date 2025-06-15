import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:8081/api/students/student-list")
      .then((res) => {
        if (res) {
          setStudents(res.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
          setLoading(false)
        } else {
          setError("server is not responding. please try again!");
          setLoading(false)
        }
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/students/delete-student/${id}`)
      .then((res) => {
        if (res) {
          setStudents(students.filter((stud) => stud.id != id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if(loading) return <div className="h-[90vh] flex justify-center items-center">
                       <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                     </div>



  return (
    <div className="px-3 sm:ml-50 bg-gray-100 pt-20 pb-10 min-h-[100vh]">
      <div className="shadow-sm max-w-5xl mx-auto overflow-hidden">
        <h1 className="text-2xl text-gray-900 font-bold">Student List</h1>
        <p className="text-gray-700 text-sm mb-3">Student / <span className="text-gray-500">student List</span></p>
        <div className="grid grid-cols-5  gap-2 px-3 py-3 bg-gray-200 text-xs sm:text-md font-semibold">
          <div>Id</div>
          <div>Full Name</div>
          <div>Gender</div>
          <div>Phone</div>
          <div className="text-center">Action</div>
        </div>

        {students && students?.length ? (
          students.map((stud,index) => (
            <div
              key={stud.id}
              className={`grid sm:grid-cols-5 gap-2 px-3 py-3 text-sm sm:hover:bg-gray-100 ${index % 2 !== 0 && 'bg-gray-200'} sm:bg-white`}
            >
              <div>  <span className="text-black font-medium sm:hidden">ID:</span> {stud.id}</div>
              <div>
                <span className="text-black font-medium sm:hidden">Full Name:</span> {stud.first_name} {stud.last_name}
              </div>
              <div>
              <span className="text-black font-medium sm:hidden">Gender:</span>   {stud.gender}
              </div>
              <div>
              <span className="text-black font-medium sm:hidden">Phone:</span>  {stud.phone}
              </div>
              <div>
                <div className="flex whitespace-nowrap gap-2">
                  <button
                    onClick={() => handleDelete(stud.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer font-medium duration-150"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/student/update/${stud.id}`}
                    className="text-green-600 hover:text-green-800 cursor-pointer font-medium duration-150"
                  >
                    update
                  </Link>
                  <Link
                    to={`/student/detail/${stud.id}`}
                    className="text-yellow-600 hover:text-yellow-800 cursor-pointer font-medium duration-150"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No records</div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
