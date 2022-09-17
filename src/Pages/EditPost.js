import { useState, useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../Context/BlogContext'
import { useParams } from 'react-router-dom'
import PostService from '../Storage/api'
import { useRef } from 'react'
import axios from 'axios'



function EditPost(props) {
    const {
        postImage, setPostImage,
        postBody, setPostBody,
        postTittle, setPostTittle,
        postDescription, setPostDescription, setToastControll,
        toastControll, toastMessage, setToastMessage
    } = useContext(BlogContext)



    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
    };

    const data = {
        postTitle: postTittle,
        postBody: postBody,
        postDescription: postDescription,
        postPhoto: postImage
    }

    const getPostDetail = () => {
        axios.get(
            'http://localhost:5000/api/posts/' + props.postId,
            config
        ).then(result => {
            console.log(result.data)
            setPostBody(result.data.postBody)
            setPostTittle(result.data.postTitle)
            setPostDescription(result.data.postDescription)
        })
    }

    useEffect(() => {
        getPostDetail()
    }, [])

    const editPost = (e) => {
        e.preventDefault()
        props.setOpenEditPostModal(false)
        axios.post(
            'http://localhost:5000/api/posts/' + props.postId,
            data, config
        ).then(result => {
             console.log(result)
             setToastMessage("Edit succsesfull")
             setToastControll(true)

         })
    }


    const handleImageSelectLocal = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()
            reader.onload = function (e) {
                setPostImage(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
        console.log(postImage)
    }

    return (
        <>
            <div className='fixed inset-0 bg-black bg-opacity-70   flex items-center justify-center  z-50' >
                <div className='bg-sky-200  h-[500] w-[500px] rounded-xl '>
                    <form className='p-5' >
                        <div className='flex items-center'>
                            <input value={postTittle} onChange={(e) => { setPostTittle(e.target.value) }} placeholder="Post Tittle" className='bg-white w-2/3 h-10 focus:outline-none text-xs p-2 rounded placeholder:text-xs ' />
                            <div>
                                <label className=" bg-cyan-600 px-2 py-3 rounded-md text-xs ml-2  text-white cursor-pointer hover:opacity-60" htmlFor="file_input">{postImage ? "Image Added!" : "Add Image"} </label>
                                <input
                                    onChange={handleImageSelectLocal}
                                    className="hidden w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input"
                                    type="file"
                                />
                            </div>
                        </div>
                        <input value={postDescription} onChange={(e) => {setPostDescription(e.target.value) }} placeholder="Post Description" className='bg-white w-full h-10 focus:outline-none text-xs mt-2 p-2 rounded placeholder:text-xs ' />
                        <div className='mt-2'>
                            <textarea
                                value={postBody}
                                onChange={(e) => { setPostBody(e.target.value) }}
                                className="w-full h-80 p-2 resize-none border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 placeholder:text-xs  text-xs"
                                name="comment"
                                placeholder="Post Body"
                            >
                            </textarea>
                        </div>
                        <div className='flex items-center justify-between'>
                            <button onClick={() => { props.setOpenEditPostModal(false) }}
                                className='font-semibold flex items-center gap-2 px-2 py-1  rounded-lg bg-sky-500 hover:opacity-70 text-white'>
                                <span>Close</span>
                            </button>
                            <button onClick={editPost} className='font-semibold flex items-center gap-2 px-2 py-1 rounded-lg bg-sky-500 hover:opacity-70 text-white ml-5'>
                                <span>Edit Post</span>
                            </button>
                          
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditPost