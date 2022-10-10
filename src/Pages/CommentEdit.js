import React from 'react'
import { IoMdClose } from "react-icons/io"

function CommentEdit(props) {

    return (
        <div className="  bg-black bg-opacity-90  fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center border shadow-sm ">
                <div className=" flex flex-col  bg-sky-100 py-3 px-5 border-2 ">
                    <div className='flex items-center justify-between' >
                        <div className='flex items-center gap-x-2 mt-2'>
                            <img className='w-6 h-6 rounded-full cursor-pointer hover:opacity-80 ' src='https://picsum.photos/200' />
                            <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>Cebrail</span>
                        </div>
                        <IoMdClose onClick={() => props.setUpdateComment(false)} size={20} className='hover:text-slate-700' />
                    </div>
                    <textarea
                        value={props.commentById ? props.commentById : "Yorum bilgisine erişilemedi.."}
                        onChange={(e)=>{props.setCommentById(e.target.value)}}
                        className="w-72 sm:w-96 h-32 p-2 mt-2 text-xs resize-none border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                        name="comment"
                        placeholder=""></textarea>
                    <button onClick={props.commentUpdate} className='px-2 py-1 mt-2 text-sm w-20 float-right text-white hover:opacity-90 bg-blue-600 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 '>Update</button>
                </div>
            </div>
        </div>

    )
}

export default CommentEdit