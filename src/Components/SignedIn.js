import React from 'react'
import { Dropdown } from "semantic-ui-react"
import { useContext } from 'react';
import BlogContext from '../Context/BlogContext'
import { AiOutlineUser, AiOutlineHeart, AiOutlineSetting, } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import { IoMdArrowDropdown } from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function SignedIn() {
    const { posts,
        isAuthenticated,
        setIsAuthenticated,
        dropDownDisplay, setDropDownDisplay,
        handleDropDownDisplay, currentuser, setCurrentUser,
        loadingMessage,
        setLoadingMessage,
        loading,
        setLoading } = useContext(BlogContext)

    let navigate = useNavigate()

    const handleLogout = () => {    
        setIsAuthenticated(!isAuthenticated)  
        localStorage.clear("tokenKey")
        localStorage.clear("nickname")
        navigate("/")
    }

    return (
        <>
            <div className='flex items-center' >
                <div onClick={handleDropDownDisplay} className='font-serif mr-3 cursor-pointer flex'>
                    <span className='font-cinzel'>{localStorage.getItem("currentUserName")}</span>
                </div>
                <img className='w-8 h-8 rounded-full ' src='https://picsum.photos/200' />
            </div>
            <div className={`absolute right-10 lg:right-20 mt-1 ${dropDownDisplay} bg-white font-radjani border`}>
                <ul className='font-radjani '>
                    <Link to={`/profile/` + localStorage.getItem("nickname")}>
                        <li onClick={() => {setDropDownDisplay("hidden") }} className='flex items-center space-x-2 hover:bg-slate-100 px-2 py-1 cursor-pointer'>
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
                        <Link to={`/setting/${localStorage.getItem("currentUserId")}`}><span>Setting</span></Link>
                    </li>
                    <li onClick={handleLogout} className='flex items-center space-x-2 hover:bg-slate-100 px-2 pb-1 cursor-pointer'>
                        <span><BiLogOut /></span>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SignedIn