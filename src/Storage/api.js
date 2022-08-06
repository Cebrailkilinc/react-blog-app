import axios from "axios"

export default class PostService{
    

    getAllPost(){
        return axios.get("http://localhost:5000/api/posts/all")
    }

    getPostDetail(id){
        return axios.get("https://jsonplaceholder.typicode.com/posts/"+id)
    }

}