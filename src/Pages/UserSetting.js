import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InfoSetting from "./InfoSetting";
import PasswordSetting from "./PasswordSetting";
import BlogContext from "../Context/BlogContext";
var bcrypt = require('bcryptjs');

function UserSetting() {

  const { userId } = useParams()
   const {currentuser, setCurrentUser} = useContext(BlogContext)
   var hash = bcrypt.hashSync('12345678', 8);
   
  console.log(hash)
  console.log(currentuser.password)


  const [nickname, setNickname] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [settingControll, setSettigControll] = useState(false);
  const [formInfoAlertControll, setFormInfoAlertControll] = useState(false);

  
  if (currentuser.password == hash ) {
    window.alert("sdfasdfk")
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      'Content-Type': 'text/plain'
    }

  };

  const getUserDetail = () => {
    axios.get(
      'http://localhost:5000/api/users/' + userId,
      config
    ).then(result => {
      setFirstName(result.data.firstName)
      setLastName(result.data.lastName)
      setEmail(result.data.email)
      setNickname(result.data.username)
    }).catch(err => console.log(err))
  }
  useEffect(() => {
    getUserDetail()
  }, [])

  const userInfoData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: nickname
  }

  //Update userInfo
  const updateUserInfo = () => {
    localStorage.setItem("currentUserName", firstName)
    localStorage.setItem("nickname", nickname)
    axios.put('http://localhost:5000/api/users/' + userId, userInfoData, config)
      .then(result => console.log(result))
  }
  const handleSettingChange = () => {
    setSettigControll(settingControll === true ? false : true)
  }

  // update password
  const updatePasswordInfo = () => {
    console.log("password working...!")
    axios.put('http://localhost:5000/api/users/change/' + userId, newPassword ,config)
      .then(result => console.log(result.data))
  }


  return (
    <>
      <div className="w-full h-screen flex flex-col  items-center bg-gradient-to-r from-blue-500 via-purple-200 to-pink-200   ">
        <div className="h-1/3  w-full">
          <h1 className="text-white">Account Setting</h1>
        </div>
        <div className=" absolute flex w-5/6 sm:w-2/4 h-96 top-40 bg-white shadow-2xl rounded-md z-50 ">
          <div className="w-2/6 border-r text-center p-1 sm:p-5 " >
            <div>
              <img className="w-12 h-12 mt-6 sm:mt-0 sm:w-20 sm:h-20 rounded-full mx-auto" src="https://picsum.photos/200/300" />
              <h3 className="font-semibold text-xs sm:text-base mt-2 ">Cebrail KILINÇ</h3>
            </div>
            <div className="text-xs" >
              <button onClick={handleSettingChange} className="font-semibold w-full mt-10 border-b pb-1 cursor-pointer hover:text-sky-500 focus:border-b-sky-500 ">User</button>
              <button onClick={handleSettingChange} className="font-semibold w-full mt-5 border-b pb-1 cursor-pointer hover:text-sky-500 focus:border-b-sky-500 ">Password</button>
            </div>
          </div>
          <div className="w-4/6 text-center flex flex-col items-center justify-center" >
            {
              formInfoAlertControll ?
                <div className="p-2 mb-4 text-xs text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                  <span class="font-medium">Info alert!</span>
                </div> : null
            }
            <div className="w-3/4 text-center flex flex-col items-center justify-center">
              {settingControll ? <InfoSetting updateUserInfo={updateUserInfo} nickname={nickname} firstName={firstName} lastName={lastName} email={email} handleSettingChange={handleSettingChange} setEmail={setEmail} setNickname={setNickname} setFirstName={setFirstName} setLastName={setLastName} /> :
                <PasswordSetting updatePasswordInfo={updatePasswordInfo} password={password} confirmPassword={confirmPassword} setPassword={setPassword} newPassword={newPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} handleSettingChange={handleSettingChange} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSetting