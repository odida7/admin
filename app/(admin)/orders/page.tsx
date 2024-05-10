'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter()
  const {userId} = useAuth()

  if(!userId){
    router.push('/sign-in')
    return
  }
  return (
    <div>
      order
    </div>
  )
}

export default page
