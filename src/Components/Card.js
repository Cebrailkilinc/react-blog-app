import React from 'react'

//Icons
import { BsHeart, BsFillShareFill, BsFillHeartFill  } from "react-icons/bs"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaRegComment } from "react-icons/fa"
import {AiOutlineHeart} from "react-icons/ai"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { number } from 'prop-types'


function Card({ username, head, description, id }) {

    const [clickcLikeButton, setClickLikeButton] = useState(true)
    const [numberOfLike, setNumberOfLike] = useState(1)

    const handleLikeButton=()=>{
        setClickLikeButton(!clickcLikeButton)
        
        if (clickcLikeButton == true) {
            setNumberOfLike(numberOfLike + 1)
        }else{
            setNumberOfLike(numberOfLike - 1)
        }
    }

    return (
        <div className='w-[300px] sm:w-72 h-96 mt-5 overflow-hidden  border shadow-md shadow-indigo-300'>
            <div>
                <img className="object-cover h-40 w-full cursor-pointer hover:opacity-80 " src='https://picsum.photos/200' />
            </div>
            <div className='text-xs p-2 overflow-hidden text-center h-36 '>
                <div className='flex items-center justify-between mb-4 font-thin'>
                    <span className='text-lg cursor-pointer hover:opacity-80 h-8 w-full text-center overflow-hidden'>{head}</span>
                </div>
                <Link to={`/post/${id}`}><p className='cursor-pointer   hover:opacity-80 font-thin text-xs' >{description}</p></Link>
            </div>
            <div className='p-2 bottom-0 flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                   {clickcLikeButton ? <BsHeart onClick={handleLikeButton} className='cursor-pointer' /> : <BsFillHeartFill color='red' onClick={handleLikeButton} className='cursor-pointer' /> }
                    <span className='text-sm font-semibold' >{numberOfLike}</span>

                </div>
                <div>
                    <BsFillShareFill className='cursor-pointer ' />
                </div>
            </div>
            <div className='flex items-center justify-between p-2   border-t'>
                <div className='flex items-center gap-x-2 font-cinzel'>
                    <div className='flex items-center'>
                        <img className='w-6 h-6 rounded-full cursor-pointer hover:opacity-80' src='https://picsum.photos/200' />
                        <span className='text-xs font-extrabold cursor-pointer hover:opacity-80 ml-3'>Cebrail kılınç</span>
                    </div>
                </div>
                <div>
                    22/02/2022
                </div>
            </div>
        </div>
    )
}

export default Card