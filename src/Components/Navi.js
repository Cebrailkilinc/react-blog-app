import { useEffect } from 'react'
import SignedOut from './SignedIOut'
import SignedIn from './SignedIn'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

//react icons
import { HiOutlineMenu } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { useState } from 'react';


//Context
import { useContext } from 'react';
import BlogContext from '../Context/BlogContext'



function Navi() {
    const {  currentuser,
    } = useContext(BlogContext)

    const [isOpenSideMenu, setIsOpenSideMenu] = useState(true)

    //Open_Sidebar_Menu
    const handleSideMenu = () => {
        setIsOpenSideMenu(!isOpenSideMenu)
    }

    return (

        <div className='bg-white border-b shadow sticky top-0 z-50  '>
            <div className=" flex justify-between items-center mx-auto max-w-6xl h-16 z-50 font-cinzel">
                <div className=''>
                    <Link to="/"><h1 className='p-4 hover:text-indigo-300 cursor-pointer'>Blog</h1></Link>
                </div>
                <div className='hidden sm:block '>
                    <ul className='flex items-center cursor-pointer'>
                        <li onClick={() => { localStorage.clear("tokenKey") }} className='p-4 hover:text-indigo-300'>About</li>
                        <Link to={"/"}><li className='p-4 hover:text-indigo-300'>Home</li></Link>
                    </ul>
                </div>
                <div className='hidden sm:block '>
                    {localStorage.getItem("currentUserName") ? <SignedIn /> : <SignedOut />}
                </div>

                {/*Mobile Menu */}
                <div onClick={handleSideMenu} className='block sm:hidden'>
                    <ul className='hover:text-indigo-300'>
                        <li className='p-4'>{isOpenSideMenu ? <HiOutlineMenu size={20}  /> : <AiOutlineClose />}</li>
                    </ul>
                </div>
                <div className={!isOpenSideMenu ? 'block sm:hidden fixed top-0 left-0 w-[60%] h-full bg-indigo-100  duration-1000  ' : "fixed h-full w-[60%] top-0 left-[-100%] duration-1000  "}>
                    <ul className='mt-10 uppercase text-center font-bold cursor-pointer  '>
                        <Link to={"/"}><li className='p-4'>Home</li></Link>
                        <Link to={`/profile/` + localStorage.getItem("nickname")}><li className='p-4'>Profile</li></Link>
                        <Link to={`/setting/${currentuser.id}`}><li className='p-4'>Setting</li></Link>
                        <li className='p-4'>Logout</li>
                    </ul>
                    <div className='absolute bottom-10 left-6 flex items-center gap-3' >
                        <img className="object-cover h-10 w-10 rounded-full  cursor-pointer hover:opacity-80 " src='https://picsum.photos/200' />
                        <span>Deneme</span>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Navi