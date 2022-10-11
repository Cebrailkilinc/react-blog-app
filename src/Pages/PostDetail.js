import { useState, useEffect, useContext } from 'react'
import BlogContext from '../Context/BlogContext'
import { Link, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { BsHeart, BsFillHeartFill } from "react-icons/bs"
import { BiCommentEdit } from "react-icons/bi"
import { VscComment } from "react-icons/vsc"
import { AiFillDelete } from "react-icons/ai"
import Loading from '../Components/Loading'
import toast, { Toaster } from 'react-hot-toast';
import CommentEdit from './CommentEdit'
import LİkeList from './LİkeList'


function Post() {
  const { postDetail, setPostDetail, currentuser } = useContext(BlogContext)

  const { id } = useParams()

  const [postComments, setPostComments] = useState("")
  const [commentOfUser, setCommentOfUser] = useState("")
  const [likesOfPost, setLikeOfPost] = useState([])
  const [likeButtonControll, setLikeButtonControll] = useState(true)
  const [numberOfLike, setNumberOfLike] = useState(0)
  const [commentAccordion, setCommentAccordion] = useState("h-36")
  const [toastMessage, setToastMessage] = useState("")
  const [updateComment, setUpdateComment] = useState(false)
  const [commentById, setCommentById] = useState("")
  const [postCommentId, setPostCommentId] = useState("")
  const [likeListControll, setLikeListControll] = useState(false)



  // This function created for page top
  const onTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    onTop()
  }, [])

  //Toast controll
  const notifySuccess = () => {
    toast.success("Yorum başarı ile eklendi!")
  }
  const notifyError = () => toast.error("İşlem maalesef gerçekleştirilemedi !")
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
      setNumberOfLike(likesOfPost.length)
    }).catch(err => {
      console.log(err)
    })
  }

  // add likes
  const likeData = {
    userId: currentuser.id,
  }

  const handleLikePost = () => {
    axios.post("http://localhost:5000/api/likes/" + id, likeData, config).then(result => {
      console.log(result.data)
      setLikeOfPost([result.data, ...likesOfPost])
      setNumberOfLike(numberOfLike + 1)

    }).finally(() => setLikeButtonControll(false))
  }

  // This function created for delete comment.
  const handleLikeDelete = async () => {
    setLikeButtonControll(true)
    await axios.delete(`http://localhost:5000/api/likes/delete?userId=${localStorage.getItem("currentUserId")}&postId=${id}`, config)
      .then(result => {
        setNumberOfLike(numberOfLike - 1)
        setLikeOfPost([...likesOfPost])
      }).finally(() => setLikeButtonControll(true))
  }

  const handleLikeList = async () => {   
    setLikeListControll(true)
    await axios.post("http://localhost:5000/api/comments/edit/" + postCommentId, commentById, config)
      .then(result => {
        console.log(result.data)      
      }) 
  }

  useEffect(() => {
    let like = likesOfPost.find(item => item.userId == localStorage.getItem("currentUserId"))
    if (like != null) {
      setLikeButtonControll(false)
    }
  }, [likesOfPost.length])


  useEffect(() => {
    getPostDetail();
  }, [likesOfPost.length])


  // Data of comment
  const commentData = {
    commentBody: postComments
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

  }, [commentOfUser.length])




  // ADD COMMENT TO POST
  const addCommentToPost = async (e) => {
    setToastMessage("yorum eklendi")
    e.preventDefault()
    if (postComments != "") {
      await axios.post(
        'http://localhost:5000/api/comments/' + id,
        commentData,
        config
      ).then(result => {
        setCommentOfUser([result.data, ...commentOfUser])
        setToastMessage("")
        notifySuccess();
      }).catch(err => {
        notifyError()
        console.log(err)
      })
      setPostComments("")
    } else {
      window.alert("Yorum boş olamaz")
    }
  }


  //Delete comment
  const handleDeleteComment = async (commentId) => {
    console.log(commentId)
    await axios.delete("http://localhost:5000/api/comments/" + commentId, config)
      .then(result => {
        setCommentOfUser([result.data, ...commentOfUser])

        notifySuccess();
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Comment accordion controll
  const handleComment = (e) => {
    e.preventDefault()
    if (commentAccordion === "h-36") {
      setCommentAccordion(" ")
    } else {
      setCommentAccordion("h-36")
    }
  }

  const getCommentById = async (id) => {
    setPostCommentId(id)
    setUpdateComment(true)
    await axios.get("http://localhost:5000/api/comments/" + id, config)
      .then(result => {
        setCommentById(result.data.commentBody)
        console.log(result.data)}) 
  }


  const commentUpdate = async () => {   
    setUpdateComment(true)
    await axios.post("http://localhost:5000/api/comments/edit/" + postCommentId, commentById, config)
      .then(result => {
        console.log(result.data)      
      }) 
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='pb-10'>
        <div className='flex justify-center'>
          <div className='w-11/12 md:w-2/3 border  mt-10'>
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
                {likeButtonControll ? <BsHeart className='transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-100  duration-300  cursor-pointer hover:opacity-50' onClick={handleLikePost} size={20} /> : <BsFillHeartFill className='transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-100  duration-300  cursor-pointer hover:opacity-50' color='red' onClick={handleLikeDelete} size={20} />}
                <span onClick={handleLikeList} className='text-sm font-semibold cursor-pointer hover:opacity-70'>{numberOfLike} like </span>
              </div>
              <div className='flex items-center gap-2'>
                <VscComment color='blue' className='transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-100  duration-300 cursor-pointer hover:opacity-50 ' onClick={handleComment} size={23} />
                <span className='text-sm font-semibold hover:opacity-70 cursor-pointer'>{commentOfUser.length} comment</span>
              </div>
            </div>
            <div className={`p-5 bg-white ${commentAccordion} overflow-hidden font-thin`}>
              <div className=' flex items-center justify-between'>
                <h1 className='font-bold text-3xl' >Comments</h1>
                <h6 onClick={handleComment} className='font-bold text-sm cursor-pointer hover:opacity-70' >See All Comments</h6>
              </div>

              {
                commentOfUser ? commentOfUser.map((item, i) => {
                  return (
                    <div className={`px-5 border border-gray-200 pb-1 mt-2 mb-1`} key={i}>
                      <div className='flex items-center gap-x-2 mt-2'>
                        <img className='w-6 h-6 rounded-full cursor-pointer hover:opacity-80 ' src='https://picsum.photos/200' />
                        <span className='text-xs font-extrabold cursor-pointer hover:opacity-80'>{item.firstName}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs mt-3 px-8'>{item.commentBody}</p>
                        {item.userId == localStorage.getItem("currentUserId") ? <span className='flex items-center gap-4'><BiCommentEdit onClick={() => getCommentById(item.id)} className='cursor-pointer hover:text-amber-700' /><AiFillDelete onClick={() => handleDeleteComment(item.id)} className='cursor-pointer hover:text-red-600' /></span> : ""}
                      </div>
                    </div>
                  )
                }) : <Loading />
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
                  <button onClick={addCommentToPost} className="px-2 py-1 text-sm text-white hover:opacity-90 bg-blue-600 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 ">
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {updateComment ? <CommentEdit commentUpdate={commentUpdate} setCommentById={setCommentById} commentById={commentById} setUpdateComment={setUpdateComment} /> : ""}
      {likeListControll ? <LİkeList  setLikeListControll={ setLikeListControll} handleLikeList={ handleLikeList} /> : ""}
    </>
  )
}

export default Post 