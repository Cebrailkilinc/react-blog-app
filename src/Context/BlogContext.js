import { createContext } from "react";
import { useState } from "react";
import posts from "../Storage/posts"


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


    const handleDropDownDisplay = () => {
        setDropDownDisplay(dropDownDisplay === "hidden" ? "" : "hidden")
    }
   

    const values = {

        posts,
        isAuthenticated, setIsAuthenticated,
        dropDownDisplay, setDropDownDisplay, handleDropDownDisplay,
        jwt, setJwt,

    }






    return <BlogContext.Provider value={values} >{children}</BlogContext.Provider>
}

export default BlogContext;