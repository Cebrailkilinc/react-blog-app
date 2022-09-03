import React from 'react'
import Navi from '../Components/Navi'
import Card from '../Components/Card'
import Slider from "../Components/Slider"
import BlogContext from "../Context/BlogContext"
import { useContext } from 'react'
import { useEffect } from 'react'
import PostService from '../Storage/api'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import Loading from '../Components/Loading'


function Layout() {

    const {
        isAuthenticated,
        setIsAuthenticated,
        dropDownDisplay,
        setDropDownDisplay,
        jwt,
        allUsers,
        setAllUsers,
        setCurrentUser,
        allPost, setAllPost
    } = useContext(BlogContext)


    let navigate = useNavigate();

    const [loading, setLoading] = useState(false)



    //Loading_Page
    useEffect(() => {
        setLoading(true)
        setTimeout(setLoading, 500)
    }, [])

    //Call_All_Post
    useEffect(() => {
        axios.get(
            'http://localhost:5000/api/home'
        ).then(result => {
            setAllPost(result.data)
        })
    }, [])


    return (
        <>{loading ? <Loading /> :
            <div onClick={() => { setDropDownDisplay("hidden") }} className='overflow-hidden scrollbar-hide '>
                <Slider />

                <div className='max-w-5xl justify-center mx-auto  grid grid-cols-1 sm:grid-cols-3 place-items-center '>
                    {
                        allPost?.map((ite, i) => {
                            return (<div key={i} ><Card id={ite.id} username={ite.username} head={ite.postTitle} description={ite.postBody} /></div>)
                        })
                    }
                </div>
            </div>
        }
        </>
    )
}

export default Layout