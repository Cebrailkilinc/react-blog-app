import { useState, useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../Context/BlogContext'
import { useParams } from 'react-router-dom'
import PostService from '../Storage/api'
import axios from 'axios'


function Post() {

  const { posts, postDetail, setPostDetail, currentuser } = useContext(BlogContext)

  const { id } = useParams()

  const [postComments, setPostComments] = useState("")

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
  };

  const getPostDetail = () => {
    axios.get(
      'http://localhost:5000/api/posts/' + id,
      config
    ).then(result => {
      setPostDetail(result.data)
    })
  }
  getPostDetail()


  const data = {
    commentBody: postComments
  }
  const addCommentToPost = (e) => {
    e.preventDefault()
    axios.post(
      'http://localhost:5000/api/comments/' + id,
      data,
      config
    ).then(result => {
      console.log(result.data)
    })
    setPostComments("")
  }

  return (
    <div className='pb-10'>
      <div className='flex justify-center'>
        <div className='w-80 md:w-2/3 border  mt-10'>
          <div className='flex items-center justify-between gap-x-2 p-5 font-cinzel border-b'>
            <div className='flex items-center gap-x-2'>
              <img className='w-9 h-9 rounded-full cursor-pointer hover:opacity-80' src='https://picsum.photos/200' />
              <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>deneme</span>
            </div>
            <h1>20/10/2022</h1>
          </div>
          <div className='mt-5 border-b pb-10 p-5 text-sm'>
            <h1 className='mb-5 font-semibold'>{postDetail?.postTitle}</h1>
            <img className='mb-5' src={postDetail?.postPhoto} />
            <p>{postDetail.postBody}</p>
          </div>
          <div className='p-5 bg-yellow-100'>
            <h1 className='font-bold text-3xl' >Comments</h1>
            {
              postDetail.comments?.map((item, i) => {
                return (
                  <div className='px-5' key={i}>
                    <div className='flex items-center gap-x-2 mt-5 '>
                      <img className='w-6 h-6 rounded-full cursor-pointer hover:opacity-80 ' src='https://picsum.photos/200' />
                      <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>{localStorage.getItem("currentUserName")}</span>
                    </div>
                    <p className='text-xs mt-3 px-3'>{item.commentBody}</p>
                  </div>
                )
              })
            }
          </div>
          <div className=' bg-slate-100'>
            <form action="" className="w-full p-5 sm:p-10">
              <div className="mb-2">
                <label htmlFor="comment" className="text-lg text-gray-600">Add a comment:</label>
                <textarea
                  value={postComments}
                  onChange={(e) => { setPostComments(e.target.value) }}
                  className="w-full h-32 p-2 mt-2 text-xs resize-none border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                  name="comment"
                  placeholder=""></textarea>
              </div>
              <div>
                <button onClick={addCommentToPost} className="px-2 py-1 text-sm text-blue-100 bg-blue-600 rounded">
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post 