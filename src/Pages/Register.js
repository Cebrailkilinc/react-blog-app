import React from 'react'
import { useFormik } from 'formik'
import validationSchema from "../Validations/Main.js"

import { AiOutlineUser } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/hi"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {



  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("") 


  const navigate = useNavigate()

  let data = {
    firstName: userFirstName,
    lastName: userLastName,
    username: userName,
    email: userEmail,
    password: userPassword
  };

  const handleRegisterMember = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/authentication/sign-up', data)
      .then(response => {
        alert("İşlem Başarılı " + response.status);
      })
    setUserEmail("")
    setUserName("")
    setUserPassword("")
    navigate("/login")

  }

  return (
    <div className='flex flex-col justify-center items-center  w-full text-center'>
      <div className='w-80 h-[450px]  mt-10 my-auto border p-5 shadow-2xl'>
        <h1 className='text-3xl mb-5 text-sky-500'>Sign-Up</h1>
        <form onSubmit={handleRegisterMember} className='flex flex-col items-center'>
          <div className='flex items-center border rounded-md  '>
            <input onChange={(e) => { setUserFirstName(e.target.value) }}  type="text" name='username' placeholder='Name' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs' />
          </div>
          <div className='flex items-center border mt-2 rounded-md '>
            <input onChange={(e) => { setUserLastName(e.target.value) }}  type="text" name='username' placeholder='Surname' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs ' />
          </div>
          <div className='flex items-center border mt-2 rounded-md  '>
            <input onChange={(e) => { setUserName(e.target.value) }} value={userName} type="text" name='username' placeholder='Username' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs ' />
          </div>
          <div className='flex items-center border mt-2 rounded-md '>
            <input onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type="email" name='email' placeholder='Email' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs ' />
          </div>
          <div className='flex items-center justify-center border mt-2 rounded-md  '>
            <input onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type="password" name='password' placeholder='Password' className='outline-none placeholder:text-xs p-2 w-60 ' />
          </div>
          <div className='flex items-center mt-3 gap-4 '>
            <button type='submit' className='w-60 h-8 bg-sky-500 text-white font-radjani hover:bg-indigo-300 rounded-md'>Register</button>
          </div>
          <div className='flex items-center mt-5 text-xs '>
            <span className='border-b w-14 mr-4'></span>
            <h1>Yada</h1>
            <span className='border-b w-14 ml-4'></span>
          </div>
          <div className='flex items-center mt-2 '>
            <FcGoogle className='mx-2' size={25} />
            <FaFacebook color='blue' className='mx-2' size={25} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register