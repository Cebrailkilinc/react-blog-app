import React from 'react'
import { Dropdown } from "semantic-ui-react"
import { useContext } from 'react';
import BlogContext from '../Context/BlogContext'
import { AiOutlineUser, AiOutlineHeart, AiOutlineSetting, } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { useState } from 'react';
import { Link } from 'react-router-dom';


function SignedIn() {

    const { posts,
        isAuthenticated,
        setIsAuthenticated,
        dropDownDisplay, setDropDownDisplay, handleDropDownDisplay
    } = useContext(BlogContext)

    return (
        <>
            <div className='flex items-center ' >
                <h1 onClick={handleDropDownDisplay} className='font-serif mr-3 cursor-pointer'>Cebrail</h1>
                <img className='w-8 h-8 rounded-full ' src='https://picsum.photos/200' />
            </div>
            <div className={`absolute right-10 lg:right-20 mt-1 ${dropDownDisplay} bg-white font-radjani border`}>
                <ul className=' '>
                    <Link to="/profile">
                        <li onClick={()=>{setDropDownDisplay("hidden")}} className='flex items-center space-x-2 hover:bg-slate-100 px-2 py-1 cursor-pointer'>
                            <span><AiOutlineUser /></span>
                            <span>Profile</span>
                        </li>
                    </Link>
                    <li className='flex items-center space-x-2 hover:bg-slate-100 px-2 pb-1 cursor-pointer'>
                        <span><AiOutlineHeart /></span>
                        <span>Favorite</span>

                    </li>
                    <li className='flex items-center space-x-2 hover:bg-slate-100 px-2 pb-1 cursor-pointer'>
                        <span><AiOutlineSetting /></span>
                        <span>Setting</span>
                    </li>
                    <li className='flex items-center space-x-2 hover:bg-slate-100 px-2 pb-1 cursor-pointer'>
                        <span><BiLogOut /></span>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SignedIn