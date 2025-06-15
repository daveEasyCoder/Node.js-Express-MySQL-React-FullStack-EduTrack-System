import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react';
import { useSidebar } from './Context';
const Header = () => {
  const {setIsSidebarVisible} = useSidebar()
  return (
    <header className='bg-white border-b-1 border-b-gray-200 py-3 px-6 fixed top-0 left-0 sm:left-50 right-0'>
    <nav className='flex items-center justify-between'>
        <div onClick={() => setIsSidebarVisible(prev => !prev)} className='sm:hidden mr-2 cursor-pointer'>
           <Menu size={24} />
        </div>
        <div className='font-semibold text-black text-xl w-1/2'>
          <input type="text" placeholder='Search...' className='py-2 px-1.5 text-gray-700 rounded-sm text-sm focus:outline-blue-700 w-1/2' />
        </div>
        <ul className='flex items-center gap-4 text-white w-1/2 justify-end pr-3'>
            <li><Link to = "aboute-developer" className='text-black font-semibold hover:text-blue-600 duration-150'>Developer</Link></li>
        </ul>
    </nav>
</header>
  )
}

export default Header