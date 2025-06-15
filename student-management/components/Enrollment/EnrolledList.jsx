import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { formatDate } from '../FormatDate';
const EnrolledList = () => {

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [selected, setSelected] = useState(null);
    const [enrollments,setEnrollments] = useState([])
    useEffect(() => {

        setLoading(true)
        axios
          .get("http://localhost:8081/api/enrollments/get-enrollments") 
          .then((res) => {
            setEnrollments(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if(err.response && err.response.data && err.response.data.error){
                setError(err.response.data.error)
            }else{
                setError("server is not responding please try later.");
            }
            setLoading(false);
          });
      }, []);

     const handleDeleteEnroll = (id) => {
        axios.delete(`http://localhost:8081/api/enrollments/delete-enrollment/${id}`)
        .then(res => {
           if(res){
            window.location.reload()
           }
          
        })
        .catch(err => {
            console.log(err);
            
        })
     }
     



      if(loading) return <div className="h-[90vh] flex justify-center items-center">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
      if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto pt-20 sm:ml-50 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold mb-6 text-center">Enrollment List</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {enrollments.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelected(item)}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        >
          <p className="text-sm text-gray-500">ID: {item.id}</p>
          <p className="font-semibold">
            {item.student_first_name} {item.student_last_name}
          </p>
          <p className="text-gray-700">Course: {item.course_name}</p>
          <p className="text-gray-600">Date: {formatDate(item.enrollment_date)}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
              item.status === "Active"
                ? "bg-green-100 text-green-700"
                : item.status === "Completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>

    {/* Detail Modal/Box */}
    {selected && (
      <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-2">Enrollment Detail</h2>
          <p><strong>Student:</strong> {selected.student_first_name} {selected.student_last_name}</p>
          <p><strong>Course:</strong> {selected.course_name}</p>
          <p><strong>Date:</strong> {formatDate(selected.enrollment_date)}</p>
          <p><strong>Status:</strong> {selected.status}</p>
          <p><strong>ID:</strong> #{selected.id}</p>
          <button onClick={() => handleDeleteEnroll(selected.id)} className='bg-red-600 text-sm cursor-pointer py-1 px-5 text-white rounded-sm hover:bg-red-700 duration-150 mt-2'>Delete</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default EnrolledList