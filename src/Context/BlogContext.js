import { createContext } from "react";
import { useState } from "react";
import posts from "../Storage/posts"

const BlogContext = createContext();

export const BlogProvider =({children})=>{

    // Authetication
    const [isAuthenticated, setIsAuthenticated] = useState(true)



    const values = {
       
        posts,
        isAuthenticated, setIsAuthenticated,
        

    }






    return <BlogContext.Provider value={values} >{children}</BlogContext.Provider>
}

export default BlogContext;