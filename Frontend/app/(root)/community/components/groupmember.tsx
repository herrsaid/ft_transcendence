
import { useContext, useState } from 'react'
import {SlOptionsVertical} from 'react-icons/sl'
import reciverContext from '../reciverContext'
import UserContext from '../../UserContext';

export default function Groupmember({data}:any)
{
    const reciver = useContext(reciverContext);
    const user = useContext(UserContext);
    const [click, setClick] = useState(false)
    return(
        <div className=" p-1 w-full flex justify-between hover:bg-sky-800">
            <div className="flex ">
                <img className="w-10 h-10 rounded-full" src={data.user.profile_img} alt="No image" />
                <h1 className="p-1">{data.user.username}</h1>
            </div>
            <div className='p-2 relative'>
                {(reciver.reciver.me != "user")&&<button onClick={() => setClick(!click)}><SlOptionsVertical/> </button>}
                {
                    (click) && <div className='bg-[#18184a] absolute right-2 p-2 rounded-lg '>
                    <button className='hover:bg-[#363672] w-full'>mute</button>
                    <button className='hover:bg-[#363672] w-full'>kick</button>
                    <button className='hover:bg-[#363672] w-full'>ban</button>
                </div>
                }
            </div>
        </div>
    )
}