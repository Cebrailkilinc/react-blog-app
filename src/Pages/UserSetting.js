import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function UserSetting() {

  const { userId } = useParams()

  const [nickname, setNickname] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("tokenKey")}` }
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

  const editUserInfo = (e) => {
    e.preventDefault()
    axios.post(
      "http://localhost:5000/api/users/" + userId,
      userInfoData, config
    ).then(result => {
      console.log(result.data)
    })
  }


  return (
    <>
      <div className="grid grid-cols-12 max-w-4xl  mx-auto gap-3">
        <div className='col-span-11 grid grid-cols-12  '>  
          <div className='grid col-span-8 border-x p-2 justify-center'>
            <h1>AYARLAR</h1>
            <div className="flex items-center gap-2">
              <input defaultValue={nickname} onChange={(e) => { setNickname(e.target.value) }} className="h-8 w-44 border outline-none text-xs p-1" />
              <div className="mb-1">
                <label className=" bg-cyan-600 px-2 py-2 rounded-md text-xs  text-white cursor-pointer hover:opacity-60" htmlFor="file_input"> Add Image</label>
                <input
                  className="hidden w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </div>
            </div>
            <input defaultValue={firstName} className="h-8 w-64 border outline-none text-xs p-1" />
            <input defaultValue={lastName} className="h-8 w-64 border outline-none text-xs p-1" />
            <input defaultValue={email} className="h-8 w-64 border outline-none text-xs p-1" />
            <button onClick={editUserInfo} className="bg-blue-500 text-white h-10">Kaydet</button>
          </div>
        </div>
        <div className='col-span-1'></div>
      </div>



    </>
  )
}

export default UserSetting