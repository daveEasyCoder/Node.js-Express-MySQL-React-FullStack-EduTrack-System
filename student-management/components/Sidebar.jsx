import React, { Children, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GraduationCap,UserPlus,BookOpen,UserCheck,User,LayoutDashboard } from "lucide-react";
import { useSidebar } from './Context';
import { Menu,X } from 'lucide-react';
const Sidebar = () => {
    const sidebar = [{
        title:"Student",
        icon: <User className="text-green-600" size={24} />,
        children:[{
            subTitle:'Add student',
            to:'add-student'
        },{
            subTitle:'Student List',
            to:'students'
        }]
    },{
        title:"Teacher",
        icon: <UserCheck className="text-yellow-500" size={24} />,
        children:[{
            subTitle:'Add teacher',
            to:'add-teacher'
        },{
            subTitle:'Teacher view',
            to:'teachers'
        }]
    },{
        title:"Course",
        icon: <BookOpen className="text-blue-500" size={24} />,
        children:[{
            subTitle:'Add Course',
            to:'add-course'
        },{
            subTitle:'Course view',
            to:'courses'
        }]
    },{
        title:"Enrollment",
        icon: <UserPlus className="text-rose-600" size={24} />,
        children:[{
            subTitle:'Enroll',
            to:'enrollments'
        },{
            subTitle:'Enrolled List',
            to:'enrolled-student'
        }]
    }]
    const[activeIndex,setActiveIndex] = useState([])
    const {isSidebarVisible,setIsSidebarVisible} = useSidebar()
    const handleShowChildren = index => {
       setActiveIndex(activeIndex.includes(index) ? activeIndex.filter(active => active !== index) : prev => [...prev,index])
    }
  return (
    <div className={`h-[100vh] fixed sm:left-0 top-0 w-50 border-r-1 border-r-gray-200 z-10 bg-white overflow-hidden ${isSidebarVisible ? 'left-0' : '-left-50'}`}>
        <div>
            {/* <p className='font-bold text-2xl text-gray-900 py-2.5 px-4 border-b-1 border-b-gray-200 mb-2'>Stud</p> */}
          <div className="flex items-center gap-2 px-2 py-3">
          <X onClick={() => setIsSidebarVisible(prev => !prev)} className="text-gray-600 cursor-pointer sm:hidden" size={24} />
           <GraduationCap className="hidden sm:block text-blue-600" size={26} />
                 <span className="text-xl font-bold text-gray-800">
                    EduTrack
                </span>
            </div>
            <div className='px-1 bg-white pt-3'>
                
                <div className='pl-2 py-1.5 hover:bg-gray-100 cursor-pointer flex gap-2 items-center'><LayoutDashboard className="text-indigo-600" size={20} /><Link onClick={() => setIsSidebarVisible(prev => !prev)} to="/" className='text-gray-800 font-medium text'>Dashboard</Link></div>
                {
                    sidebar.map((side,index) => (
                            <div key={index} className=''>
                                <div onClick={() => handleShowChildren(index)} className='py-1.5 rounded-sm pl-2 cursor-pointer hover:bg-gray-200 text-gray-800 font-medium flex items-center gap-1.5 text-md'>{side.icon} {side.title}</div>
                                {
                                    activeIndex.includes(index) && 
                                       <div className='pl-7.5'> 
                                            {
                                                side.children.map((child,i) =>  <div key={i} className='py-1 pl-2 rounded-sm  text-sm'><Link onClick={() => setIsSidebarVisible(prev => !prev)} className='hover:text-blue-500 duration-150' to={child.to}>{child.subTitle}</Link></div>)
                                            }
                                        </div>
                                }
                             
                            </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar