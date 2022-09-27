import { useState, useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../Context/BlogContext'
import { Link, useParams } from 'react-router-dom'
import PostService from '../Storage/api'
import axios from 'axios'
import moment from 'moment'
import { BsHeart, BsFillShareFill, BsFillHeartFill } from "react-icons/bs"
import { VscComment } from "react-icons/vsc"


function Post() {

  const { posts, postDetail, setPostDetail, currentuser } = useContext(BlogContext)

  const { id } = useParams()


  const [postComments, setPostComments] = useState("")
  const [commentOfUser, setCommentOfUser] = useState("")
  const [likesOfPost, setLikeOfPost] = useState([])
  const [likeButtonControll, setLikeButtonControll] = useState(true)

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
  };

  // Get post
  const getPostDetail = async () => {
    await axios.get(
      'http://localhost:5000/api/posts/' + id,
      config
    ).then(result => {
      setPostDetail(result.data)      
      setLikeOfPost(result.data.postsLikes)      
    }).catch(err => console.log(err))
  }

 
  // add likes
  const likeData = {
    userId: currentuser.id,
  }

  const handleLikePost = () => {
    axios.post("http://localhost:5000/api/likes/" + id, likeData, config).then(result => {
      console.log(result.data)
        setLikeOfPost([result.data, ...likesOfPost]) 
        setLikeButtonControll(false)            
    })
  }

  const handleLikeDelete = async () =>{
   await axios.delete(`http://localhost:5000/api/likes/delete?userId=${localStorage.getItem("currentUserId")}&postId=${id}`,config)
    .then(result => {
      console.log(result)  
       
    })   
  }

  useEffect(()=>{
    getPostDetail();
  },[likesOfPost])

  // Data of comment
  const commentData = {
    commentBody: postComments
  }

  const addCommentToPost = async (e) => {
    e.preventDefault()
    await axios.post(
      'http://localhost:5000/api/comments/' + id,
      commentData,
      config
    ).then(result => {
      console.log("Succsessfull !")
    })
    setPostComments("")
  }

  const getPostComment = () => {
    axios.get(
      'http://localhost:5000/api/comments/post/' + id,
      config
    ).then(result => {
      setCommentOfUser(result.data)
    })
  }
  useEffect(() => {
    getPostComment()
  }, [])


  return (
    <div className='pb-10'>
      <div className='flex justify-center'>
        <div className='w-80 md:w-2/3 border  mt-10'>
          <div className='flex items-center justify-between gap-x-2 p-5 font-cinzel border-b'>
            <div className='flex items-center gap-x-2'>
              <img className='w-9 h-9 rounded-full cursor-pointer hover:opacity-80' src='https://picsum.photos/200' />
              <Link to={`/visit/${postDetail.userId}`}><span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>{postDetail.firstName}</span></Link>
            </div>
            <h1>{moment(postDetail.postCreateTime).format("MMM Do YY")}</h1>
          </div>
          <div className='mt-5 border-b pb-10 p-5 text-sm'>
            <h1 className='mb-5 font-semibold'>{postDetail?.postTitle}</h1>
            <img className='mb-5' src={postDetail?.postPhoto} />
            <p>{postDetail.postBody}</p>
          </div>
          <div className='px-5 py-3 flex gap-5 items-center'>
            <div className='flex items-center gap-2'>
              {likeButtonControll ? <BsHeart onClick={handleLikePost} size={20} /> : <BsFillHeartFill onClick={handleLikeDelete} size={20} />}
              <span>{likesOfPost.length}</span>
            </div>
            <div className='flex items-center gap-2'>
              <VscComment size={23} />
              <span>98</span>
            </div>
          </div>
          <div className='p-5 bg-yellow-100'>
            <h1 className='font-bold text-3xl' >Comments</h1>
            {
              commentOfUser ? commentOfUser.map((item, i) => {
                return (
                  <div className='px-5' key={i}>
                    <div className='flex items-center gap-x-2 mt-5 '>
                      <img className='w-6 h-6 rounded-full cursor-pointer hover:opacity-80 ' src='https://picsum.photos/200' />
                      <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>{item.firstName}</span>
                    </div>
                    <p className='text-xs mt-3 px-3'>{item.commentBody}</p>
                  </div>
                )
              }) : null
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