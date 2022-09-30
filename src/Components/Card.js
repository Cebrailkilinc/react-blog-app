import { useContext, useEffect } from 'react'
import moment from 'moment'
import BlogContext from '../Context/BlogContext'
//Icons
import { BsFillShareFill} from "react-icons/bs"
import { GrLike } from "react-icons/gr"
import { Link } from 'react-router-dom'


function Card({ username, head, description, postId, lastName, firstName, postCreateTime, userId, setUserId, numberOfLike }) {
    const {
        currentuser, setCurrentUser
    } = useContext(BlogContext)

    //current id: console.log(currentuser.id)
    return (
        <div className='w-[300px] sm:w-72 h-96 mt-5 overflow-hidden  border shadow-md shadow-indigo-300'>
            <div>
                <img className="object-cover h-40 w-full cursor-pointer hover:opacity-80 " src='https://picsum.photos/200' />
            </div>
            <div className='text-xs p-2 overflow-hidden text-center h-36 '>
                <div className='flex items-center justify-between mb-4 font-thin'>
                    <span className='text-lg cursor-pointer hover:opacity-80 h-8 w-full text-center overflow-hidden'>{head}</span>
                </div>
                <Link to={localStorage.getItem("nickname") ? `/post/${postId}` : "/login"}><p className='cursor-pointer   hover:opacity-80 font-thin text-xs' >{description}</p></Link>
            </div>
            <div className='px-5 py-2 bottom-0 flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                    <GrLike />
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
                        <span className='text-xs font-extrabold cursor-pointer hover:opacity-80 ml-3'>{firstName}</span>
                    </div>
                </div>
                <div className='text-xs'>
                    {moment(postCreateTime).format("MMM Do YY")}
                </div>
            </div>
        </div>
    )
}

export default Card