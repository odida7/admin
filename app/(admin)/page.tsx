'use client'

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const {userId} = useAuth()

  if(!userId){
    router.push('/sign-in')
    return
  }

  return (
    <div className="p-4">
     home
      
    </div>
  );
}
