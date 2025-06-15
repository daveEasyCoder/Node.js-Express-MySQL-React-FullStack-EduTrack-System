import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList = () => {

  const [courses,setCourses] = useState([])
  const[loading,setLoading] = useState(false)
  const[error,setError] = useState("")
  

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8081/api/courses/course-list")
      .then((res) => {
        if (res) {
          setCourses(res.data);
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

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")){
      axios.delete(`http://localhost:8081/api/courses/delete-course/${id}`)
      .then(res => {
         if(res.data.message){
           setCourses(prevCourse => prevCourse.filter(c => c.id !== id))
         }
      })
      .catch(error => {
        console.log(error);
        
      })
    }
  }

  return (

  <div className="space-y-6 sm:ml-50 pt-20 bg-gray-100 pb-5 px-3">
    <h1 className="text-2xl text-gray-900 font-bold mb-2 pl-1">Courses List</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 gap-5 max-w-5xl">
    {courses.map((course) => (
      <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.course_name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed w-full ">{course.desctiption?.length > 70 ? course.desctiption.slice(0,70)+'...' : course.desctiption}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 ${
            course.name ? 'bg-green-100 text-gray-800' : 'bg-red-100 text-gray-800'
          }`}>
            {course.name ? 'active' : 'inactive'}
          </span>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Credit Hours:</span>
            <span className="font-medium text-gray-900">{course.credit_hour}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Instructor:</span>
            <span className="font-medium text-gray-900">{course.name ? course.name : 'Not assigned'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Enrollments:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-primary-800">
              {course.enrollments} Students
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
          <Link to = {`/courses/detail/${course.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 text-sm">View Details</Link>
          <button className="cursor-pointer p-2">
            <Link to={`/courses/update/${course.id}`}>✏️</Link>
          </button>
          <button onClick={() => handleDeleteCourse(course.id)} className="cursor-pointer p-2">
            <span>🗑️</span>
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default CourseList