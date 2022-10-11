import Card from '../Components/Card'
import Slider from "../Components/Slider"
import BlogContext from "../Context/BlogContext"
import { useContext, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Components/Loading'
import Marquees from '../Components/Marquees'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'



function Layout() {

    const navigate = useNavigate()
    const {
        setDropDownDisplay,
        allPost, setAllPost,
        setLoadingMessage,
        loading,
        setLoading,
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
        else {
            axios.get(
                'http://localhost:5000/api/posts/all', config
            ).then(result => {
                setAllPost(result.data)
            }).catch(err => console.log(err))
        }
    }, [])

    return (
        <>    
            {loading ? <Loading /> : null}
            <div onClick={() => { setDropDownDisplay("hidden") }} className='overflow-hidden scrollbar-hide '>
                <Slider />
                <Marquees />
                <div className='max-w-5xl justify-center mx-auto  grid grid-cols-1 sm:grid-cols-3 place-items-center '>
                    {
                        allPost?.map((ite, i) => {
                            return (<div key={i} ><Card postId={ite.id} numberOfLike={ite.postsLikes.length} firstName={ite.firstName} lastName={ite.lastName} postCreateTime={ite.postCreateTime} username={ite.username} head={ite.postTitle} description={ite.postBody} /></div>)
                        })
                    }
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Layout