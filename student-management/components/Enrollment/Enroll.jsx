import React, { useState, useEffect } from "react";
import axios from "axios";
const Enroll = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [enrollError,setEnrollError] = useState("")

  const [enrollData, setEnrollData] = useState({
    studentId: "",
    courseId: "",
    enrollDate: "",
    status: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/students/student-list")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("server is not responding. try later!");
        }
      });

    axios
      .get("http://localhost:8081/api/courses/course-list")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("server is not responding. try later!");
        }
      });
  }, []);

  const handleChange = (e) => {
    setEnrollData({
      ...enrollData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnroll = (e) => {
      e.preventDefault();
      setEnrollError("") // if there was error message 
      

    if(!enrollData.studentId || !enrollData.courseId || !enrollData.enrollDate || !enrollData.status){
      alert("please fill all fields")
    }else{
      axios.post("http://localhost:8081/api/enrollments/enroll-student",enrollData)
      .then(res => {
        alert("Enrolled successfully")
        setEnrollData({
            studentId: "",
            courseId: "",
            enrollDate: "",
            status: ""
        })
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          setEnrollError(err.response.data.error)
        }else{
          setEnrollError("server is not responding. please try again!")
        }
        setEnrollData({
          studentId: "",
          courseId: "",
          enrollDate: "",
          status: ""
      })

      })
    }
  };
  return (
    <div className="sm:ml-50 pt-10 bg-gray-100 min-h-screen pb-10">
      {error ? (
        <div className="ml-55 pt-20">{error}</div>
      ) : (
        <form
          onSubmit={handleEnroll}
          className="max-w-2xl p-6 ml-4 mt-10 bg-white shadow-sm rounded-md space-y-4"
        >
          <h2 className="text-xl font-semibold">Enroll Student in Course</h2>

          <div className="">
            <label className="font-medium text-gray-600" htmlFor="">
              Student Name
            </label>
            <select
              className="w-full p-2 border rounded mt-2"
              name="studentId"
              value={enrollData.studentId}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-600" htmlFor="">
              Course:
            </label>
            <select
              className="w-full p-2 border rounded mt-2"
              name="courseId"
              value={enrollData.courseId}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-600" htmlFor="">Enrollment Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded mt-2"
              name="enrollDate"
              value={enrollData.enrollDate}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

         <div>
            <label className="font-medium text-gray-600" htmlFor="">Status</label>
              <select
                name="status"
                value={enrollData.status}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 border rounded mt-2"
            >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
            </select>
         </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Enroll
          </button>
           { enrollError && <p className="text-red-500">{enrollError}</p> }
        </form>
      )}
    </div>
  );
};

export default Enroll;
