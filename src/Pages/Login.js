import { useState } from 'react'
import { useFormik } from 'formik'
import validationSchema from "../Validations/Main.js"
import AuthService from '../Storage/auth.js'
import PostService from '../Storage/api.js'

import { AiOutlineUser } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../Context/BlogContext.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Components/Loading.js'


function Login() {


    let navigate = useNavigate();
    const {
        isAuthenticated,
        setIsAuthenticated,
        dropDownDisplay,
        setDropDownDisplay,
        setCurrentUser,
        currentUser
    } = useContext(BlogContext)


    // Users_Data_State  
    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")
  



    const getTokenData = () => {
        localStorage.setItem("nickname", nickName)
        let authService = new AuthService()
        authService.postUserAuth(nickName, password)
            .then(response => {
                localStorage.setItem("tokenKey", response.data)
                setIsAuthenticated(true)
                console.log(localStorage.getItem("tokenKey"))
            })
    }

    const getCurrentUser = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
        };

        axios.get(
            'http://localhost:5000/api/users/find/' + localStorage.getItem("nickname"),
            config
        ).then(result => {
            const newUser = result.data;
            setCurrentUser(newUser)
            console.log(result.data)
            localStorage.setItem("currentUserName", result.data.firstName)
            navigate("/")
        })
    }


    const handleLogin = async () => {
        getTokenData()
        setTimeout(getCurrentUser, 500)
    }

    return (
        <div className='flex flex-col justify-center items-center  w-full text-center'>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-10">
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input value={nickName} name='username' onChange={(e) => { setNickName(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                    <p className="text-red text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={handleLogin} type='button' className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">SignIn</button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Login