import React from 'react'
import { Link } from "react-router-dom";

function SignedIn() {
    return ( 
        <ul className='flex items-center gap-5'>
            <li className=' '>
                <Link to="/login"><button className='hover:text-indigo-300'>Logın</button></Link>
            </li>
            <li className='  hover:opacity-60  '>
                <Link to="/register"><button >Register</button></Link>
            </li>
        </ul>

    )
}

export default SignedIn