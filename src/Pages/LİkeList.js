import React from 'react'
import {IoMdClose } from "react-icons/io"

function LİkeList(props) {
    return (
        <div className="  bg-black bg-opacity-40  fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center border shadow-sm ">
                <div className=" flex flex-col h-5/6 w-10/12 sm:w-1/4 w bg-sky-100 py-3 px-5 border-2 ">
                    <div className='flex items-center justify-between' >
                     
                        <IoMdClose onClick={()=>{props.setLikeListControll(false)}} size={20} className='hover:text-slate-700' />
                    </div>                  
                </div>
            </div>
        </div>
    )
}

export default LİkeList