import { createContext } from "react";
import { useState } from "react";
import posts from "../Storage/posts"
import axios from "axios";
import { useEffect } from "react";



const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

    // Authetication
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //Dropdown_Menu_Open
    const [dropDownDisplay, setDropDownDisplay] = useState("hidden")

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

    //Post_Comments
    

    const handleDropDownDisplay = () => {
        setDropDownDisplay(dropDownDisplay === "hidden" ? "" : "hidden")
    }
   
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
    }


    return <BlogContext.Provider value={values} >{children}</BlogContext.Provider>
}

export default BlogContext;