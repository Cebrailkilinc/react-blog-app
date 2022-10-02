import React from 'react'
import BlogContext from '../Context/BlogContext'
import { useContext } from 'react'
import { Dna } from 'react-loader-spinner'

function Loading() {

  const {
    loadingMessage,
  } = useContext(BlogContext)

  return (
    <div className='w-full h-screen flex items-center  bg-zinc-50  fixed inset-0   z-50 justify-center '>
      <div role="status " className='mb-28 flex flex-col items-center'>
        <Dna height="120" width="120" />
        <span className="mt-5 text-2xl">{loadingMessage}</span>
      </div>
    </div>
  )
}

export default Loading