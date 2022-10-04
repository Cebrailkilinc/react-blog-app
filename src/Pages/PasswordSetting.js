import React from 'react'

function PasswordSetting(props) {
    return (
        <div>
            <input value={props.password} onChange={(e)=>{props.setPassword(e.target.value)}} type={"password"} placeholder="Password" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 h-10 text-xs px-2" />
            <input value={props.newPassword} onChange={(e)=>{props.setNewPassword(e.target.value)}} type={"password"} placeholder="New password" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 m-3 h-10 text-xs px-2" />
            <input value={props.confirmPassword} onChange={(e)=>{props.setConfirmPassword(e.target.value)}} type={"password"} placeholder="Password Confirm" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5  h-10 text-xs px-2" />
            <div><button onClick={props.updatePasswordInfo} className="p-2 bg-sky-500  text-white text-xs rounded-sm font-semibold hover:opacity-70 mt-3">Save Change</button> </div>
        </div>
    )
}
export default PasswordSetting;