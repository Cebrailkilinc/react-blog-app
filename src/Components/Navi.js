import React from 'react'
import SignedOut from './SignedIOut'
import SignedIn from './SignedIn'
import { Link } from 'react-router-dom'

//react icons
import { HiOutlineMenu } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { useState } from 'react'

//Context
import { useContext } from 'react';
import BlogContext from '../Context/BlogContext'


function Navi() {
    const { posts,
            isAuthenticated,
            setIsAuthenticated, } = useContext(BlogContext)

    const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)


    const handleSideMenu = () => {
        setIsOpenSideMenu(!isOpenSideMenu)
    }
    

    const handleAuthenticated =()=>{
        setIsAuthenticated(!isAuthenticated)
    }

           


    return (
        <div className='bg-white border-b shadow sticky top-0 z-50 '>
            <div className=" flex justify-between items-center mx-auto max-w-6xl h-16 z-50 font-cinzel">
                <div className=''>
                    <Link to="/"><h1 className='p-4 hover:text-indigo-300 cursor-pointer'>Blog</h1></Link>
                </div>
                <div className='hidden sm:block '>
                    <ul className='flex items-center cursor-pointer'>
                        <li className='p-4 hover:text-indigo-300'>About</li>
                        <li className='p-4 hover:text-indigo-300'>Home</li>
                        <li className='p-4 hover:text-indigo-300'>Feed</li>
                    </ul>
                </div>
                <div className='hidden sm:block'>
                    {isAuthenticated ? <SignedIn/> : <SignedOut/>}
                </div>

                {/*Mobile Menu */}
                <div onClick={handleSideMenu} className='block sm:hidden'>
                    <ul className='hover:text-indigo-300'>
                        <li className='p-4'>{isOpenSideMenu ? <HiOutlineMenu size={20} onClick={() => console.log("cebrail kılınç")} /> : <AiOutlineClose />}</li>
                    </ul>
                </div>
                <div className={!isOpenSideMenu ? 'block sm:hidden fixed top-0 left-0 w-[60%] h-full bg-indigo-100  duration-1000  ' : "fixed h-full w-[60%] top-0 left-[-100%] duration-1000  "}>
                    <ul className='mt-10 uppercase text-center font-bold cursor-pointer'>
                        <li className='p-4'>About</li>
                        <li className='p-4'>Home</li>
                        <li className='p-4'>Feed</li>
                        <li className='p-4'>Feed</li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navi