import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const TeacherList = () => {
  const teachers = [1, 2, 3, 4, 5, 6];
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8081/api/teachers/teacher-list")
      .then((res) => {
        if (res) {
          setTeacherInfo(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
          setLoading(false);
        } else {
          setError("server is not responding. please try again!");
          setLoading(false);
        }
      });
  }, []);

  const handleDeleteTeacher = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")){
      axios.delete(`http://localhost:8081/api/teachers/delete-teacher/${id}`)
      .then(res => {
        if (res) {
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  }


  if(loading) return <div className="h-[90vh] flex justify-center items-center">
                       <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                     </div>

  return (
    <div className="sm:ml-50 bg-gray-100 pt-20 min-h-[100vh]">
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="shadow-sm max-w-5xl mx-3">
            <div className='max-w-5xl mx-auto'>
            <h1 className="text-2xl text-gray-900 font-bold">Teacher List</h1>
            <p className="text-gray-700 text-sm mb-3">Teacher / <span className="text-gray-500">Teacher List</span></p>
             </div>
          <div className="grid grid-cols-6  gap-2 px-3 py-3 bg-white border-b-1 border-b-gray-200 text-sm md:text-md font-semibold">
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Gender</div>
            <div>Qualification</div>
            <div className="text-center">Action</div>
          </div>

          {teacherInfo && teacherInfo?.length ? (
            teacherInfo.map((teacher) => (
              <div
                key={teacher.id}
                className="grid md:grid-cols-6 gap-2 px-3 py-3 bg-white text-sm hover:bg-gray-100"
              >
                <div>
                   <span className="font-bold text-gray-700 md:hidden">Full Name</span> {teacher.name}
                  </div>
                <div>
                  <span className="font-bold text-gray-700 md:hidden">Email</span>  {teacher.email}
                </div>
                <div>
                  <span className="font-bold text-gray-700 md:hidden">Phone</span> {teacher.phone}
                </div>
                <div>
                  <span className="font-bold text-gray-700 md:hidden">Gender</span> {teacher.gender}
                 </div>
                <div>
                   <span className="font-bold text-gray-700 md:hidden">Qualification</span>   {teacher.qualification}
                 </div>
                <div>
                  <div className="flex whitespace-nowrap gap-2">
                    <button onClick={() => handleDeleteTeacher(teacher.id)} className="text-red-600 hover:text-red-800 cursor-pointer font-medium duration-150">
                      Delete
                    </button>
                    <Link to={`/teacher/update/${teacher.id}`} className="text-yellow-600 hover:text-yellow-700 font-medium duration-150">
                      Edit
                    </Link>
                    <Link to={`/teacher/detail/${teacher.id}`} className="text-blue-600 hover:text-blue-700 font-medium duration-150">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No records</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherList;
