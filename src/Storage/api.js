import axios from "axios"

export default class PostService{
    

    getAllPost(){
        return axios.get("http://localhost:5000/api/posts/all")
    }
    getPostById(){
        return axios.get("http://localhost:5000/api/posts/all")
    }

    getPostDetail(id){
        return axios.get("https://jsonplaceholder.typicode.com/posts/"+id)
    }

    getUsers(jwt){
        const config = {
            headers: { Authorization: `Bearer ${jwt}` }
        };        
       return axios.get(  'http://localhost:5000/api/users/all',config)
    
        
    }

}