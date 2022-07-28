import React from 'react'
import { Link } from "react-router-dom";

function SignedIn() {
    return (

        <ul className='flex items-center'>
            <li className='p-4'>
                <Link to="/login"><button className='hover:text-indigo-300'>Logın</button></Link>
            </li>
            <li className='p-2 px-3 hover:opacity-60 bg-gradient-to-r from-indigo-300 rounded-3xl '>
                <Link to="/register"><button >Register</button></Link>
            </li>
        </ul>

    )
}

export default SignedIn