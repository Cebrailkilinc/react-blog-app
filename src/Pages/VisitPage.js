import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import axios from "axios"
import { VscComment } from "react-icons/vsc"
import { GrLike } from "react-icons/gr"


function VisitPage() {

    const [visitUserData, setVisitUserData] = useState("")
    const { userId } = useParams() 

    // Get post
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
    };
    const getUserDetail = () => {
        axios.get(
            'http://localhost:5000/api/users/' + userId,
            config
        ).then(result => {
            setVisitUserData(result.data)
            console.log(result.data)
        })
    }
    useEffect(() => {
        getUserDetail()
    }, [userId])

    return (
        <>
            <div className="grid grid-cols-12 max-w-4xl  mx-auto gap-3">
                <div className='col-span-11 grid grid-cols-12  border-l '>
                    <div className='col-span-4 justify-center text-center bg-purple-50 top-80 '>
                        <img className='w-full h-40 mx-auto' src='https://picsum.photos/200/300' />
                        {/* <img className='w-20 h-20 absolute left-64 top-44 rounded-xl mx-auto ' src='https://picsum.photos/200/300' /> */}
                        <h6 className='font-bold mt-16'>{visitUserData.firstName +" "+  visitUserData.lastName }</h6>
                        <div className='flex items-center justify-center text-xs ' >
                            <h6 className='font-semibold'>Username : </h6>
                            <h6>{visitUserData.username}</h6>
                        </div>
                        <div className='flex items-center justify-center text-xs' >
                            <h6 className='font-semibold'>Email : </h6>
                            <h6>{visitUserData.email}</h6>
                        </div>

                        <div className='flex items-center justify-center text-xs' >
                            <h6 className='font-semibold'>Number of Post : </h6>
                            <h6>{visitUserData.posts?.length}</h6>
                        </div>                      
                    </div>
                    <div className='col-span-8 border-x h-screen p-2'>

                    {
                            visitUserData.posts?.map((item, i) => {
                                return (
                                    <div key={i} className="flex border rounded-lg mt-5  justify-between p-2 bg-sky-100    ">
                                        <div className='p-2 w-3/5 flex flex-col justify-between '>
                                            <Link to={"/post/"+item.id }>
                                                <div >
                                                    <h2 className='font-semibold'>{item.postTitle}</h2>
                                                    <p>{item.postDescription}</p>
                                                </div>
                                            </Link>
                                            <div className='flex items-center gap-8'>
                                                <div className='flex items-center gap-2'>
                                                    <GrLike/>
                                                    <span>12</span>
                                                </div>   
                                                <div className='flex items-center gap-2'>
                                                    <VscComment/>
                                                    <span>{item.comments.length}</span>
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

            </div>
        </>
    )
}

export default VisitPage