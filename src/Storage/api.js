import axios from "axios"

export default class PostService{
    getAllPost(){
        return axios.get("https://jsonplaceholder.typicode.com/posts")
    }

    getPostDetail(id){
        return axios.get("https://jsonplaceholder.typicode.com/posts/"+id)
    }

}