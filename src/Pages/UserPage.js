import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import BlogContext from '../Context/BlogContext'
import axios from 'axios'
import { BsFillHeartFill } from "react-icons/bs"
import { MdAddCircleOutline } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import AddPost from './AddPost'
import EditPost from './EditPost'
import Toast from '../Components/Toast'
import Loading from '../Components/Loading'



function UserPage() {

    const {
        currentuser, setCurrentUser, toastControll
    } = useContext(BlogContext)

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
        })
    }
    getCurrentUser();

    return (
        <>


            <div className="grid grid-cols-12 max-w-4xl  mx-auto gap-3">
                <div className=' col-span-12 sm:col-span-11 grid  sm:grid-cols-12  border-l '>
                    <div className='col-span-12 sm:col-span-4 pt-2 pb-5 justify-center text-center bg-zinc-50  top-80 '>
                        <img className='hidden sm:block w-full h-40 mx-auto' src='https://picsum.photos/200/300' />
                        <img className='w-20 h-20 sm:absolute left-10 top-32 sm:left-[270px] sm:top-48 rounded-xl mx-auto ' src='https://picsum.photos/200/300' />
                        <h6 className='font-bold mt-2 sm:mt-12'>Cebrail Kılınç</h6>
                        <div className='flex items-center justify-center text-xs mt-3 ' >
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

                        <div className='flex items-center justify-center text-xs mt-5 sm:mt-10 ' >
                            <button onClick={() => { setAddPostModal(true) }} className='font-semibold flex items-center gap-2 p-2 rounded-lg bg-sky-500 hover:opacity-70 text-white'>
                                <MdAddCircleOutline size={20} />
                                <span>Add Post</span>
                            </button>
                        </div>
                    </div>
                    <div className=' col-span-12 sm:col-span-8 border-x h-screen p-2'>
                        {
                            currentuser.posts ? currentuser.posts?.map((item, i) => {

                                return (
                                    <div key={i} className="flex border mt-5  justify-between p-2  bg-zinc-50   ">
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
                                            <img className='h-full w-28 object-cover ' src='https://picsum.photos/200/' />
                                        </div>
                                    </div>
                                )
                            }) : <Loading />
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