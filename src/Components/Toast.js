import React from 'react'
import BlogContext from "../Context/BlogContext"
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
    const {
        toastControll,
        setToastControll,
        toastMessage, setToastMessage

    } = useContext(BlogContext)

    return (
        <>
            <div className="  bg-zinc-200 bg-opacity-70  fixed inset-0 z-50   ">
                <div className="flex h-screen justify-center items-center ">
                    <div className="flex-col justify-center  bg-white py-5 px-24 border-2 border-sky-500 rounded-xl ">
                        <div className="flex  text-lg items-center justify-center text-zinc-600   mb-10" >{toastMessage}</div>
                        <div className="flex">
                            <button onClick={()=>{setToastControll(false)}} className=" rounded px-4 py-2 w-32 text-white  bg-green-400 ">OK</button>                        
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Toast