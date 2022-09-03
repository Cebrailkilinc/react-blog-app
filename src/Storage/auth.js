import axios from "axios"

export default class AuthService{
    
    postUserAuth(nickName, password){
        return axios.post("http://localhost:5000/api/authentication/sign-in", {
            username:nickName,
            password: password,      
        })
    }

}