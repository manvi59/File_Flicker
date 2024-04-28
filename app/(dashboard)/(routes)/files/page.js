
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

 

const Files = () => {
  return (
    <div> 
      
      <div className='flex justify-end p-5'>
        <UserButton afterSignOutUrl="/" />

      </div>


        <div className='flex justify-center   '>
        <Image src="/best.png" width={1200} height={900}  />

        </div>

       
 
    </div>
  )
}

export default Files