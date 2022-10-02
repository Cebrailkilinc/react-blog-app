import React from 'react'

function PasswordSetting({handleSettingChange}) {
    return (
        <div>
            <input  type={"password"} placeholder="Password" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 h-10 text-xs px-2" />
            <input type={"password"} placeholder="New password" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 m-3 h-10 text-xs px-2" />
            <input type={"password"} placeholder="Password Confirm" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5  h-10 text-xs px-2" />
            <div><button onClick={handleSettingChange} className="p-2 bg-sky-500  text-white text-xs rounded-sm font-semibold hover:opacity-70 mt-3">Save Change</button> </div>
        </div>
    )
}

export default PasswordSetting