import { createContext } from "react";
import { useState } from "react";
import posts from "../Storage/posts"
import axios from "axios";
import { useEffect } from "react";
import {toast } from 'react-toastify';



const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

    // Authetication
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //Dropdown_Menu_Open
    const [dropDownDisplay, setDropDownDisplay] = useState("hidden")
    const handleDropDownDisplay = () => {
        setDropDownDisplay(dropDownDisplay === "hidden" ? setDropDownDisplay("") : "hidden")
    }

    //All_Posts
    const [allPost, setAllPost] = useState([])

    // Jwt_Token
    const [jwt, setJwt] = useState("")

    //All_Users
    const [allUsers, setAllUsers] = useState([])

    //Current_User
    const [currentuser, setCurrentUser] = useState("")

    //Post_Detail
    const [postDetail, setPostDetail] = useState({})

    //Post_Properties
    const [postImage, setPostImage] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postTittle, setPostTittle] = useState("")
    const [postDescription, setPostDescription] = useState("")

    //Toast_Controll
    const [toastControll, setToastControll] = useState(false)
    const [toastMessage, setToastMessage] = useState(false)

    //Loading_Controll
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("")

   
    const values = {
        posts,
        isAuthenticated,
        setIsAuthenticated,        
        dropDownDisplay,
        setDropDownDisplay,
        handleDropDownDisplay,
        jwt,
        setJwt,
        allUsers,
        setAllUsers,
        currentuser,
        setCurrentUser,
        allPost,
        setAllPost,
        postDetail,
        setPostDetail,
        postImage, 
        setPostImage,
        postBody, 
        setPostBody,
        postTittle, 
        setPostTittle,
        postDescription, 
        setPostDescription,
        toastControll,
        setToastControll,
        toastMessage,
        setToastMessage,
        loadingMessage,
        setLoadingMessage,
        loading,
        setLoading
    }


    return <BlogContext.Provider value={values} >{children}</BlogContext.Provider>
}

export default BlogContext;