import { useState, useRef } from 'react'
import { useContext } from 'react'
import BlogContext from '../Context/BlogContext.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {

    const divRef = useRef(null)

    let navigate = useNavigate();
    const {
        setIsAuthenticated,
        setCurrentUser,
    } = useContext(BlogContext)

    // Users_Data_State  
    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")


    const getTokenData = () => {
        axios.post("http://localhost:5000/api/authentication/sign-in", {
            username: nickName,
            password: password,
        })
            .then(response => {
                setIsAuthenticated(true)
                localStorage.setItem("tokenKey", response.data)
                console.log(localStorage.getItem("tokenKey"))
            })
        localStorage.setItem("nickname", nickName)
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
            localStorage.setItem("currentUserId", result.data.id)
            navigate("/")
        }).catch(err => {
            console.log(err)
            window.alert(err)
        })
    }


    const handleLogin = async () => {
        getTokenData()
        setTimeout(getCurrentUser, 500)
    }

    return (
        <div ref={divRef} className='flex flex-col justify-center items-center  w-full text-center '>
            <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                Sign in
            </h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 sm:w-1/4 flex flex-col mt-10">
                <label className="block flex-1 relative ">
                    <input value={nickName} required onChange={(e) => { setNickName(e.target.value) }} className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
                    <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >Username</span>
                </label>
                <label className="block flex-1 relative my-5 ">
                    <input value={password} required onChange={(e) => { setPassword(e.target.value) }} type="password" className='bg-white border w-full  h-11 focus:outline-none text-xs p-2 rounded placeholder:text-xs peer ' />
                    <span className='absolute left-0 top-0 h-full px-2 flex items-center text-xs peer-valid:h-5  peer-valid:text-blue-500 peer-valid:text-xxs  transition-all' >Username</span>
                </label>

                {/* <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                    <p className="text-red text-xs italic">Please choose a password.</p>
                </div> */}
                <div className="text-center">
                    <button onClick={handleLogin} type='button' className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">SignIn</button>
                </div>
            </form>
        </div>
    )
}

export default Login