import {useState} from 'react'
import { useFormik } from 'formik'
import validationSchema from "../Validations/Main.js"

import { AiOutlineUser } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"

function Login() {

    const { handleSubmit, handleChange } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			console.log(values);
		},
        validationSchema,
	});


  
    return (
        <div className='flex flex-col justify-center items-center  w-full text-center overflow-y-scroll'>            
            <div className='w-60 h-80  mt-12 my-auto'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <img  className='w-28 object-cover' src='user2.png'/>
                    <div className='flex items-center border mt-5'>
                        <AiOutlineUser />
                        <input name='email' onChange={handleChange}  type="email" placeholder='Email' className='outline-none placeholder:text-xs p-1' />
                    </div>
                    <div className='flex items-center justify-center border mt-2 '>
                        <RiLockPasswordLine />
                        <input name='password' onChange={handleChange}  type="password" placeholder='Password' className='outline-none placeholder:text-xs p-1' />
                    </div>
                    <div className='flex items-center mt-5 gap-2 '>
                        <button type='submit' className='w-24 bg-indigo-400 text-white font-radjani hover:bg-indigo-300 '>Login</button>
                        <button className='w-24 bg-indigo-400 text-white font-radjani hover:bg-indigo-300'>Register</button>
                    </div>
                    <div className='flex items-center mt-5 text-xs '>
                        <span className='border-b w-16 mr-4'></span>
                        <h1>Ya da</h1>
                        <span className='border-b w-16 ml-4'></span>
                    </div>
                   
                </form>
            </div>
        </div>
    )
}

export default Login