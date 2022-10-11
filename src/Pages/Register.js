import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
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
      <div className='w-1/3 h-[450px]  mt-10 my-auto border p-5 shadow-2xl'>
        <h1 className='text-3xl mb-5 text-sky-500'>Sign-Up</h1>
        <form onSubmit={handleRegisterMember} className='flex flex-col items-center '>
          <label className="block flex-1 relative my-1 w-2/3  ">
            <input required onChange={(e) => { setUserFirstName(e.target.value) }} type="text" className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
            <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5 text-gray-400  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >First Name</span>
          </label>
          {/* <div className='flex items-center border rounded-md  '>
            <input onChange={(e) => { setUserFirstName(e.target.value) }} type="text" name='username' placeholder='Name' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs' />
          </div> */}

          <label className="block flex-1 relative my-1 w-2/3 ">
            <input required onChange={(e) => { setUserLastName(e.target.value) }} type="text" className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
            <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5 text-gray-400  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >Last Name</span>
          </label>
          {/* <div className='flex items-center border mt-2 rounded-md '>
            <input onChange={(e) => { setUserLastName(e.target.value) }} type="text" name='username' placeholder='Surname' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs ' />
          </div> */}

          <label className="block flex-1 relative my-1 w-2/3 ">
            <input required onChange={(e) => { setUserName(e.target.value) }} value={userName} type="text" className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
            <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5 text-gray-400  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >Username</span>
          </label>
          {/* <div className='flex items-center border mt-2 rounded-md  '>
            <input onChange={(e) => { setUserName(e.target.value) }} value={userName} type="text" name='username' placeholder='Username' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs ' />
          </div> */}

          <label className="block flex-1 relative my-1 w-2/3 ">
            <input  onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type="email" className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
            <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5 text-gray-400  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >Email</span>
          </label>
          {/* <div className='flex items-center border mt-2 rounded-md '>
            <input onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} type="email" name='email' placeholder='Email' className='outline-none placeholder:text-xs p-2 w-60 h-10 text-xs ' />
          </div> */}

          <label className="block flex-1 relative my-1 w-2/3 ">
            <input onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type="password" className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
            <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5 text-gray-400  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >Password</span>
          </label>
          {/* <div className='flex items-center justify-center border mt-2 rounded-md  '>
            // <input onChange={(e) => { setUserPassword(e.target.value) }} value={userPassword} type="password" name='password' placeholder='Password' className='outline-none placeholder:text-xs p-2 w-60 ' />
          </div> */}
          <div className='flex items-center mt-3 gap-4 '>
            <button type='submit' className='w-full h-8 px-2 bg-sky-400 text-white font-radjani hover:bg-indigo-300 rounded-sm'>Register</button>
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