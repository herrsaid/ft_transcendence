import { useContext, useEffect, useState } from 'react'
import {FaHashtag} from 'react-icons/fa'
import reciverContext from '../reciverContext'
import Cookies from 'js-cookie';
import UserContext from '../../UserContext';
import Friend from './friends';
export default function Groupinfo()
{
    const reciver = useContext(reciverContext);
    const user = useContext(UserContext)
    const [members, setMembers] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/members?id=${reciver.reciver.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json()).then(data => setMembers(data));
    },[])
    console.log('mem = ', members)
    return (
        <div className="flex flex-col justify-center h-full">
            <div className="flex flex-col  h-[40%] w-[90%] self-center mb-1 rounded-lg bg-[#363672] justify-center">
                <div className=" rounded-full self-center">
                    <FaHashtag size={60}></FaHashtag>
                </div>
                <div className="self-center">
                    {reciver.reciver.name}
                </div>
                <div className="self-center">
                    1337 member
                </div>
            </div>
            <div className="flex flex-col h-[50%] w-[90%] justify-between self-center rounded-lg bg-[#363672]">
                <div className='self-center'>
                        <h1 className='italic font-bold'>members</h1>
                </div>
                <div className='flex-grow  overflow-auto'>
                        {
                            members.map((data, index) => 
                            {
                                return (<Friend id={data.id} avatar={data.profile_img} username={data.username} key={index} />)
                            })
                        }
                </div>
                <div className='self-center'>
                    <button className='bg-red-600 hover:bg-red-500 p-2 mb-1 rounded-xl'>Leave</button>
                </div>
            </div>
        </div>
    )
}