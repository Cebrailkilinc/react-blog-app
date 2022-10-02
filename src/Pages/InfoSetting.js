import React from 'react'

function InfoSetting({handleSettingChange}) {
    return (
        <div>
            <input placeholder="username" className="border outline-none focus:border-sky-500 w-5/6 sm:w-3/5 h-10 text-sm px-2" />
            <input placeholder="First Name" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 m-3 h-10 text-sm px-2" />
            <input placeholder="Last Name" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 h-10 text-sm px-2" />
            <input placeholder="Email" className="border outline-none focus:border-sky-500 w-4/5 sm:w-3/5 m-3 h-10 text-sm px-2" />
            <div><button onClick={handleSettingChange}  className="p-2 bg-sky-500 text-xs text-white rounded-sm font-semibold hover:opacity-70">Save Change</button> </div>
        </div>
    )
}

export default InfoSetting