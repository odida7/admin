import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
      <div className='animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12'></div>
    </div>
  )
}

export default Loader
