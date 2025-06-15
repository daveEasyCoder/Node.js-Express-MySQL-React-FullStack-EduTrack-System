import React,{useEffect,useState} from "react";
import { LayoutDashboard, Users, BookOpen, UserCheck, Building2, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
axios
const Home = () => {

  const[error,setError] = useState(null)
  const [data,setData] = useState({})
  
  useEffect(() => {

    axios
      .get("http://localhost:8081/api/stats/stat")
      .then((res) => {
        if (res) {
         setData(res.data)        
        }
      })
      .catch((error) => {
          setError("not found the counts")
      });
  }, []);

 
  const stats = data ? [
    {
      title: "Total Students",
      count: data?.totalStudents,
      icon: <Users className="text-green-600" size={28} />,
    },
    {
      title: "Total Teachers",
      count: data?.totalTeachers,
      icon: <UserCheck className="text-yellow-500" size={28} />,
    },
    {
      title: "Total Courses",
      count: data?.totalCourses,
      icon: <BookOpen className="text-blue-500" size={28} />,
    },
    {
      title: "Departments",
      count: data?.totalDepartments,
      icon: <Building2 className="text-purple-600" size={28} />,
    },
    {
      title: "Female Students",
      count: data?.totalFemale,
      icon: <Users className="text-pink-500" size={28} />,
    },
    {
      title: "Male Students",
      count: data?.totalMale,
      icon: <Users className="text-blue-600" size={28} />,
    },
    {
      title: "Total Enrollments",
      count: data?.totalEnrollments,
      icon: <BarChart3 className="text-indigo-500" size={28} />,
    },
  ] : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen sm:ml-50 pt-20">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <LayoutDashboard className="text-indigo-600" size={28} /> Dashboard Overview
      </h1>
      <p className="text-gray-500 mt-1">Welcome to the admin dashboard.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-4xl">
      {stats && stats.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition-all border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-xl">
              {item.icon}
            </div>
            <div>
              <p className="text-gray-600 text-sm">{item.title}</p>
              <h2 className="text-xl font-bold text-gray-800">{item.count}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>


          {/* Quick Actions */}
       <div className="rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="add-student" className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center py-4">
            <span className="block text-xl mb-2">👨‍🎓</span>
            Add New Student
          </Link>
          <Link to="add-teacher" className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center py-4">
            <span className="block text-xl mb-2">👩‍🏫</span>
            Add New Teacher
          </Link>
          <Link to = "add-course" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4  rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 text-center py-4">
            <span className="block text-xl mb-2">📚</span>
            Create Course
          </Link>
          <Link className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center py-4">
            <span className="block text-xl mb-2">📊</span>
            Generate Report
          </Link>
        </div>
      </div>
  </div>
  )
}

export default Home