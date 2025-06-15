import React,{ useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddStudent from '../components/Student/AddStudent';
import Home from '../components/Home';
import StudentList from '../components/Student/StudentList';
import UpdateStudent from '../components/Student/UpdateStudent';
import Detail from '../components/Student/Detail';
import Sidebar from '../components/Sidebar';
import AddTeacher from '../components/Teacher/AddTeacher';
import TeacherList from '../components/Teacher/TeacherList';
import TeacherDetail from '../components/Teacher/TeacherDetail';
import AddCourse from '../components/Course/AddCourse';
import CourseList from '../components/Course/CourseList';
import UpdateCourse from '../components/Course/UpdateCourse';
import UpdateTeacher from '../components/Teacher/UpdateTeacher';
import CourseDetail from '../components/Course/CourseDetail';
import Enroll from '../components/Enrollment/Enroll';
import EnrolledList from '../components/Enrollment/EnrolledList';
import AboutDeveloper from '../components/AboutDeveloper';
function App() {

  return (
    <>
    <BrowserRouter>
       <Sidebar />
       <Header />
       <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/add-student' element={ <AddStudent />}/>
          <Route path='/students' element={ <StudentList />}/>
          <Route path='/student/update/:id' element={ <UpdateStudent />}/>
          <Route path='/student/detail/:id' element={ <Detail />}/>
          <Route path='/add-teacher' element={ <AddTeacher />}/>
          <Route path='/teachers' element={ <TeacherList />}/>
          <Route path='/teacher/detail/:id' element={ <TeacherDetail />}/>
          <Route path='/teacher/update/:id' element={ <UpdateTeacher />}/>
          <Route path='/add-course' element={ <AddCourse />}/>
          <Route path='/courses' element={ <CourseList />}/>
          <Route path='/courses/update/:id' element={ <UpdateCourse />}/>
          <Route path='/courses/detail/:id' element={ <CourseDetail />}/>
          <Route path='/enrollments' element={ <Enroll />}/>
          <Route path='/enrolled-student' element={ <EnrolledList />}/>
          <Route path='/aboute-developer' element={ <AboutDeveloper />}/>
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
