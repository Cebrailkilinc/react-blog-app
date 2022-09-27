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
import Toast from '../Components/Toast'
import Footer from '../Components/Footer';
import Marquees from '../Components/Marquees'


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
        allPost, setAllPost,
        setLoadingMessage,
        loadingMessage,     
        loading,
        setLoading,
        setUserId,
        userId
    } = useContext(BlogContext)

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
    };
  

    //Loading_Page
    useEffect(() => {
        setLoading(true)
        setLoadingMessage("Yükleniyor")
        setTimeout(setLoading, 500)
    }, [])

    //Call_All_Post
    useEffect(() => {
        if (!localStorage.getItem("currentUserName")) {
            axios.get(
                'http://localhost:5000/api/home'
            ).then(result => {
                setAllPost(result.data)            
            })
        }
        else{
            axios.get(
                'http://localhost:5000/api/posts/all',config
            ).then(result => {
                setAllPost(result.data)         
                console.log(result.data)                           
            }).catch(err =>console.log(err))
        }    
    }, [])


    return (
        <>
            {loading ? <Loading /> : null}
                <div onClick={() => { setDropDownDisplay("hidden") }} className='overflow-hidden scrollbar-hide '>
                    <Slider />
                    <Marquees/>
                    <div className='max-w-5xl justify-center mx-auto  grid grid-cols-1 sm:grid-cols-3 place-items-center '>
                        {
                            allPost?.map((ite, i) => {
                                return (<div key={i} ><Card postId={ite.id}  firstName={ite.firstName} lastName={ite.lastName} postCreateTime={ite.postCreateTime}  username={ite.username} head={ite.postTitle} description={ite.postBody} /></div>)
                            })
                        }
                    </div>
                </div>         
        </>    
       
    )
}

export default Layout