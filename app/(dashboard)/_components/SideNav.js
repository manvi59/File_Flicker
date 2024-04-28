"use client"
import { Shield, Upload ,File} from 'lucide-react'
import React, { useState } from 'react';
import Image from 'next/image'
import Files from '../(routes)/files/page';


const SideNav = () => {
    const menuList= [

        {
            id:1,
            name:'upload',
            icon:Upload,
            path:'/upload'
  
        },
        {
            id:2,
            name:'files',
            icon:File,
            path:'/files'
  
        },
        {
            id:3,
            name:'upgrade',
            icon:Shield,
            path:'/upgrade'
  
        },
    ]

    const [activeIndex, setActiveIndex]=useState(0);
  return (
    <div className='shadow-sm border-r h-full'>

        <div className='p-5 border-b'>
            {/* <Image src='/logo.svg' width={150} height={100} /> */}
            <div className=' text-blue-800 folt-bold font-semibold text-3xl'>File Flicker</div>

        </div>

        <div className='flex flex-col float-left w-full'>

        {menuList.map((item,index)=>(

            <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500
            ${activeIndex==index?'bg-blue-50 text-primary':null} `} 
            onClick={()=>setActiveIndex(index)}  >
                <item.icon/>
               <a href={`/${item.name}`} >
               <h2>{item.name}</h2> 
               
               </a> 
            </button>

        ))}
        </div>

 
    </div>
  )
}

export default SideNav