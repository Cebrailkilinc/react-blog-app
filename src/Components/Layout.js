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


function Layout() {


    var queries = [
        {
            columns: 2,
            query: 'min-width: 600px'
        },
        {
            columns: 4,
            query: 'min-width: 800px'
        }];

    const { posts } = useContext(BlogContext)
    const [allPost, setAllPost] = useState([])

    useEffect(() => {
        let postService = new PostService()
        postService.getAllPost().then(result => setAllPost(result.data))
        console.log(allPost)

    }, [])




    return (
        <>
            <div className='overflow-hidden scrollbar-hide ' >
                {<Slider />  }
                <div className='max-w-5xl  justify-center mx-auto  grid grid-cols-1 sm:grid-cols-3 '>
                
                        {
                            allPost.map((ite, i) => {
                                return (<div className='' key={i} ><Card id={ite.id} username={ite.username} head={ite.title} description={ite.body} /></div>)
                            })
                        }
                    
                </div>
            </div>
        </>
    )
}

export default Layout