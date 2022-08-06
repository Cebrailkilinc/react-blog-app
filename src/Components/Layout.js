import React from 'react'
import Navi from './Navi'
import Card from './Card'
import Slider from './Slider'
import BlogContext from "../Context/BlogContext"
import { useContext } from 'react'
import { useEffect } from 'react'
import PostService from '../Storage/api'
import { useState } from 'react'
import Columns from "react-columns"
import { queries } from '@testing-library/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Layout() {

    const navigate = useNavigate()

    const {

        isAuthenticated,
        setIsAuthenticated,
        dropDownDisplay, setDropDownDisplay, jwt
    } = useContext(BlogContext)

   

    let tokens = "eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJjZWJyYWlsIiwidXNlcklkIjoxLCJyb2xlcyI6IlVTRVIiLCJleHAiOjE2NTk3OTMxMzR9.RkUs0HLII2B4CpVqhNiQO_IkVNXYf17wt8vzxwCaF6VeKSLjhzBOInN6fRNwf070l_XyR4cYf8p4wnM-lPPpTYCvfrhv_O5NsgyE7P5ptpEtbq9lgS1Op1csv768JRrzmF7gIC0f92SQnoAKekjDosVDd6y7A5H3lm7ewzPFeuT9t722mBHULrVd4iyqu6QxxhTmvPGt2nU_eyTjNzddy47OXplc--26oTaS9ZnDVoEEiL-VO4zS2So8pSS6wLzkhDlGc6kO_QwyVGxdVhrdp37hIsiFMndbfMGXixI6a_cXnQygTphEBiSk12bqn6zEWOEvTbHy8PQeyXmM1kEFDQ"


    axios.defaults.baseURL = "http://localhost:5000/"
    axios.defaults.headers.common = { 'Authorization': `Bearer ${jwt?.data}` }

    useEffect(() => {
        let postService = new PostService()
        postService.getAllPost().then(res => console.log(res.data))
 
    },[])


    const [allPost, setAllPost] = useState([])



    return (
        <>
            <div onClick={() => { setDropDownDisplay("hidden") }} className='overflow-hidden scrollbar-hide ' >
                {<Slider />}
                <div className='max-w-5xl justify-center mx-auto  grid grid-cols-1 sm:grid-cols-3 place-items-center '>

                    {
                        allPost?.map((ite, i) => {
                            return (<div key={i} ><Card id={ite.id} username={ite.username} head={ite.title} description={ite.body} /></div>)
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Layout