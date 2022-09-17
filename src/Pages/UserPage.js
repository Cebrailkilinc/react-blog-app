import { useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import BlogContext from '../Context/BlogContext'
import { useContext } from 'react'
import axios from 'axios'
import { BsFillHeartFill } from "react-icons/bs"
import { MdAddCircleOutline } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import AddPost from './AddPost'
import { useState } from 'react'
import EditPost from './EditPost'
import Loading from '../Components/Loading'
import { Link } from 'react-router-dom'
import Toast from '../Components/Toast'


function UserPage() {

    const {
        isAuthenticated,
        setIsAuthenticated,
        dropDownDisplay, setDropDownDisplay,
        jwt, setJwt, currentuser, setCurrentUser, toastControll, setToastControll
    } = useContext(BlogContext)

    const { id } = useParams()

    const [openAddPostModal, setAddPostModal] = useState(false)
    const [openEditPostModal, setOpenEditPostModal] = useState(false)
    const [postId, setPostId] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        setTimeout(setLoading, 500)

    }, [])

    const handleId = (ids) => {
        setOpenEditPostModal(true)

        setPostId(ids)
        console.log(postId)
    }


    const handleOpenPostEditPage = () => {
        setOpenEditPostModal(!openEditPostModal)
    }

    if (openAddPostModal) {
        return <AddPost setAddPostModal={setAddPostModal} />
    }

    if (openEditPostModal) {
        return <EditPost postId={postId} setOpenEditPostModal={setOpenEditPostModal} />
    }


    const deletePost = (id) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
        };
        axios.delete(
            'http://localhost:5000/api/posts/' + id,
            config
        ).then(result => {
            console.log(result.data)
        })
    }


    const getCurrentUser2 = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
        };
        axios.get(
            'http://localhost:5000/api/users/find/' + localStorage.getItem("nickname"),
            config
        ).then(result => {
            const newUser = result.data;
            setCurrentUser(newUser)
        })
    }
    getCurrentUser2()


    return (
        <>
            <div className="grid grid-cols-12 max-w-4xl  mx-auto gap-3">
                <div className='col-span-11 grid grid-cols-12  border-l '>
                    <div className='col-span-4 justify-center text-center bg-purple-50 top-80 '>                    
                            <img className='w-full h-40 mx-auto' src='https://picsum.photos/200/300' />
                            {/* <img className='w-20 h-20 absolute left-64 top-44 rounded-xl mx-auto ' src='https://picsum.photos/200/300' /> */}
                            <h6 className='font-bold mt-16'>Cebrail Kılınç</h6>
                            <div className='flex items-center justify-center text-xs ' >
                                <h6 className='font-semibold'>Username : </h6>
                                <h6>cebrail</h6>
                            </div>
                            <div className='flex items-center justify-center text-xs' >
                                <h6 className='font-semibold'>Email : </h6>
                                <h6>cebrailkilinc@gmail.com</h6>
                            </div>

                            <div className='flex items-center justify-center text-xs' >
                                <h6 className='font-semibold'>Number of Post : </h6>
                                <h6>25</h6>
                            </div>
                            <div className='flex items-center justify-center text-xs mt-10' >
                                <button onClick={() => { setAddPostModal(true) }} className='font-semibold flex items-center gap-2 p-2 rounded-lg bg-sky-500 hover:opacity-70 text-white'>
                                    <MdAddCircleOutline size={20} />
                                    <span>Add Post</span>

                                </button>
                            </div>                    
                    </div>
                    <div className='col-span-8 border-x h-screen p-2'>
                        {
                            currentuser.posts?.map((item, i) => {

                                return (
                                    <div key={i} className="flex border rounded-lg mt-5  justify-between p-2 bg-sky-100    ">
                                        <div className='p-2 w-3/5 flex flex-col justify-between '>
                                            <Link to={"/post/" + item.id}>
                                                <div onClick={() => { setPostId(item.id) }}>
                                                    <h2 className='font-semibold'>{item.postTitle}</h2>
                                                    <p>{item.postDescription}</p>
                                                </div>
                                            </Link>
                                            <div className='flex items-center gap-8'>
                                                <div className='flex items-center gap-2'>
                                                    <BsFillHeartFill color='red' />
                                                    <span>12</span>
                                                </div>
                                                <div >
                                                    <AiFillDelete onClick={() => { deletePost(item.id) }} size={20} className='cursor-pointer' />
                                                </div>
                                                <div>
                                                    <FaRegEdit onClick={() => { handleId(item.id) }} size={20} className='cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <img className='h-full w-28 object-cover rounded-r-lg' src='https://picsum.photos/200/' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='col-span-1'></div>
                {toastControll ? <Toast /> : null}
            </div>
        </>
    )
}

export default UserPage