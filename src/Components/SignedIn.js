import React from 'react'
import { Dropdown } from "semantic-ui-react"
import { useContext } from 'react';
import BlogContext from '../Context/BlogContext'

function SignedIn() {

    const { posts,
        isAuthenticated,
        setIsAuthenticated, } = useContext(BlogContext)

    const handleAuthenticatedLogout = ()=>{
        setIsAuthenticated(!isAuthenticated)
    }    


    return (
        <div className='flex items-center font-sans'>
            <img className='w-6 h-6 rounded-full mr-2' src='https://picsum.photos/200/300' />
            <Dropdown text='CEBRAİL'>
                <Dropdown.Menu >
                    <Dropdown.Item>Profil</Dropdown.Item>
                    <Dropdown.Item>Beğenier</Dropdown.Item>
                    <Dropdown.Item onClick={handleAuthenticatedLogout}>Çıkış</Dropdown.Item>                    
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default SignedIn