
import { useState } from 'react'
import {SlOptionsVertical} from 'react-icons/sl'

export default function Groupmember(props:any)
{
    const [click, setClick] = useState(false)
    return(
        <div className=" p-1 w-full flex justify-between hover:bg-sky-800">
            <div className="flex ">
                <img className="w-10 h-10 rounded-full" src={props.avatar} alt="not found" />
                <h1 className="p-1">{props.username}</h1>
            </div>
            <div className='p-2 relative'>
                <button onClick={() => setClick(!click)}><SlOptionsVertical/> </button>
                {
                    (click) && <div className='bg-[#18184a] absolute right-2 p-2 rounded-lg '>
                    <button className='hover:bg-[#363672] w-full'>remove</button>
                    <button className='hover:bg-[#363672] w-full'>kick</button>
                    <button className='hover:bg-[#363672] w-full'>ban</button>
                </div>
                }
            </div>
        </div>
    )
}