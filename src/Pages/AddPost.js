import { useEffect } from 'react';
import { useState } from 'react'
import { TiTickOutline } from "react-icons/ti"
import axios from 'axios';
import BlogContext from '../Context/BlogContext'
import { useContext } from 'react'
import Toast from '../Components/Toast';

function AddPost(props) {

    const {
        postImage, setPostImage,
        postBody, setPostBody,
        postTittle, setPostTittle,
        postDescription, setPostDescription, setToastControll,
        toastControll, toastMessage, setToastMessage

    } = useContext(BlogContext)







    // Add_Picture
    const handleImageSelectLocal = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()
            reader.onload = function (e) {
                setPostImage(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }


    const data = {
        postTitle: postTittle,
        postBody: postBody,
        postDescription: postDescription,
        postPhoto: postImage
    }

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
    };

    const addPost = () => {
        axios.post('http://localhost:5000/api/posts/', data, config)
            .then(res => {
                console.log(res.data)
                setToastMessage("succsesfull")
                setToastControll(true)
            }

            ).catch(err =>{
                window.alert(err)}  
            )

    }

    //Add_New_Post
    const handleAddNewPost = async (e) => {
        e.preventDefault()
        await addPost()
        props.setAddPostModal(false)
    }

    return (
        <>

            <div className='fixed inset-0 bg-black bg-opacity-70   flex items-center justify-center  z-50' >
                <div className='bg-sky-200  h-[500] w-[700px] rounded-xl '>
                    <form onSubmit={handleAddNewPost} className='p-5' >
                        <div className='flex items-center'>
                            <input onChange={(e) => { setPostTittle(e.target.value) }} placeholder="Post Tittle" className='bg-white w-2/3 h-10 focus:outline-none text-xs p-2 rounded placeholder:text-xs ' />
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
                        <input onChange={(e) => { setPostDescription(e.target.value) }} placeholder="Post Description" className='bg-white w-full h-10 focus:outline-none text-xs mt-2 p-2 rounded placeholder:text-xs ' />
                        <div className='mt-2'>
                            <textarea
                                onChange={(e) => { setPostBody(e.target.value) }}
                                className="w-full h-80 p-2 resize-none border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 placeholder:text-xs  text-xs"
                                name="comment"
                                placeholder="Post Body"
                            >
                            </textarea>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <button onClick={() => { props.setAddPostModal(false) }}
                                className='font-semibold flex items-center justify-center gap-2 px-2 py-2 w-[250px]  rounded-lg bg-red-600 hover:opacity-70 text-white'>
                                <span>Close</span>
                            </button>
                            <button type='submit' className='font-semibold flex justify-center items-center w-[400px] gap-2 px-2 py-2 rounded-lg bg-sky-500 hover:opacity-70 text-white ml-5'>
                                <span>Add Post</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddPost