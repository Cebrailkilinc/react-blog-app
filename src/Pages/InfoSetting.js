import React from 'react'

function InfoSetting(props) {
    return (
        <div>
            <input value={props.nickname} onChange={(e)=>{props.setNickname(e.target.value)}}  placeholder="username" className="border outline-none focus:border-sky-500 w-5/6 sm:w-3/5 h-10 text-sm px-2" />
            <input value={props.firstName} onChange={(e)=>{props.setFirstName(e.target.value)}} placeholder="First Name" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 m-3 h-10 text-sm px-2" />
            <input value={props.lastName} onChange={(e)=>{props.setLastName(e.target.value)}} placeholder="Last Name" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 h-10 text-sm px-2" />
            <input value={props.email} onChange={(e)=>{props.setEmail(e.target.value)}} placeholder="Email" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 m-3 h-10 text-sm px-2" />
            <div><button onClick={props.updateUserInfo}  className="p-2 bg-sky-500 text-xs text-white rounded-sm font-semibold hover:opacity-70">Save Change</button> </div>
        </div>
    )
}

export default InfoSetting