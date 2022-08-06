import { useState, useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../Context/BlogContext'
import { useParams } from 'react-router-dom'
import PostService from '../Storage/api'


function Post() {

  const { posts } = useContext(BlogContext)
  const { id } = useParams()

  const [postDetail, setPostDetail] = useState({})

  useEffect(() => {
    let postService = new PostService()
    postService.getPostDetail(id).then(result => setPostDetail(result.data))
    console.log(postDetail)
  }, [])


  return (
    <div className='pb-10'>
      <div className='flex justify-center'>
        <div className='w-80 md:w-2/3 border  mt-10'>
          <div className='flex items-center justify-between gap-x-2 p-5 font-cinzel border-b'>
            <div className='flex items-center gap-x-2'>
              <img className='w-9 h-9 rounded-full cursor-pointer hover:opacity-80' src='https://picsum.photos/200' />
              <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>Cebrail kılınç</span>
            </div>
            <h1>20/10/2022</h1>
          </div>
          <div className='mt-5 border-b pb-10 p-5'>
            <h1 className='mb-5 font-semibold'>{postDetail.title}</h1>
            <img className='mb-5' src='https://picsum.photos/200' />
            <p>{postDetail.body + postDetail.body + postDetail.body + postDetail.body}</p>
          </div>
          <div className='p-5 bg-yellow-100'>
            <h1 className='font-bold text-3xl' >Comments</h1>
            <div className='flex items-center gap-x-2 mt-5'>
              <img className='w-6 h-6 rounded-full cursor-pointer hover:opacity-80' src='https://picsum.photos/200' />
              <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>Cebrail kılınç</span>
            </div>
            <p className='text-xs mt-3 px-3'>quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architectoquia et suscipit suscipit recusandae consequuntur</p>
          </div>
          
          <div className=' bg-slate-100'>
            <form action="" className="w-full p-5 sm:p-10">
              <div className="mb-2">
                <label htmlFor="comment" className="text-lg text-gray-600">Add a comment</label>
                <textarea
                  className="w-full h-20 p-2 resize-none border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                  name="comment"
                  placeholder=""></textarea>
              </div>
              <div>
                <button className="px-2 py-1 text-sm text-blue-100 bg-blue-600 rounded">
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