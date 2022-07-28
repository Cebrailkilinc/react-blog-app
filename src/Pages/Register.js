import React from 'react'
import { useFormik } from 'formik'
import validationSchema from "../Validations/Main.js"

import { AiOutlineUser } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/hi"
import { useState } from 'react'

function Register() {

  const [userInfo, setUserInfo] = useState({username:"", email:"", password:"", passwordConfirm:""})

  const { handleSubmit, handleChange,values, } = useFormik({
		initialValues: {
      username:"",
			email: '',
			password: '',
      passwordConfirm:""
      
		},
		onSubmit:( values, {resetForm}) => {
      
			console.log(values);  
      resetForm({values:""})   
		},
        validationSchema,
	});


  return (
    <div className='flex flex-col justify-center items-center  w-full text-center'>
      <div className='w-60 h-80  mt-12 my-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          <img className='w-32 object-cover' src='user.png' />
          <div className='flex items-center border '>
            <span><AiOutlineUser /></span>
            <input  onChange={handleChange} value={values.username} type="text" name='username' placeholder='Username' className='outline-none placeholder:text-xs p-1' />
          </div>
          <div className='flex items-center border mt-2 '>
            <span className='mt-1'><HiOutlineMail/></span>
            <input  onChange={handleChange} value={values.email} type="email" name='email' placeholder='Email' className='outline-none placeholder:text-xs p-1' />
          </div>
          <div className='flex items-center justify-center border mt-2 '>
            <RiLockPasswordLine />
            <input  onChange={handleChange} value={values.password} type="password" name='password' placeholder='Password' className='outline-none placeholder:text-xs p-1' />
          </div>
          <div className='flex items-center justify-center border mt-2 '>
            <RiLockPasswordLine />
            <input  onChange={handleChange}  value={values.passwordConfirm} type="password" name='passwordConfirm' placeholder='Password confirm' className='outline-none placeholder:text-xs p-1' />
          </div>
          <div className='flex items-center mt-3 gap-4 '>
            <button type='submit' className='w-44 bg-indigo-400 text-white font-radjani hover:bg-indigo-300'>Register</button>
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