'use client'

import { Avatar } from "@chakra-ui/react"
import Link from "next/link"

interface props{
    image:string,
    username:string,
    rank:number
  }

export default function CardColum(props:props) {
  return (
    <>
    


<div className={` mt-1 mb-1 stats-bg p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105 flex items-center justify-between`}>
            <div className="">
                <p>Rank:      {props.rank}</p>
            </div>

           <div>
                
           <p>{props.username}</p>
                
            </div>


            <div className="">
                <Link href={`/user?username=${props.username}`}>
                <Avatar  size='md' name={props.username} src={props.image} >
            
            </Avatar>
                </Link>
                
             </div>
      
      </div>  
    

    </>
  )
}