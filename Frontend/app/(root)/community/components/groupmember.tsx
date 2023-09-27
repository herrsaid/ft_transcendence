
import { useContext, useState } from 'react'
import {SlOptionsVertical} from 'react-icons/sl'
import reciverContext from '../reciverContext'
import UserContext from '../../UserContext';
import { GiMute } from 'react-icons/gi';
import Cookies from 'js-cookie';
import { Button, Input } from '@chakra-ui/react';

export default function Groupmember({data}:any)
{
    const reciver = useContext(reciverContext);
    const user = useContext(UserContext);
    const [click, setClick] = useState(false)
    const [kick, setKick] = useState(false)
    const [mute, setMute] = useState(false);
    const [action, setActions] = useState(true);
    const [members, setMemeber] = useState(reciver.reciver.members)
    const handlemute = () => {
        setMute(!mute);
    }
    const handlekick = ()=>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/kick?id=${reciver.reciver.id}&toremove=${data.user.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        setClick(!click);
        setKick(!kick);
    }
    const handleban = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/ban?id=${reciver.reciver.id}&toban=${data.user.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        setClick(!click);
        setKick(!kick);
    }
    const addAdmin = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/newadmin?id=${reciver.reciver.id}&new=${data.user.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        setClick(!click);
        setKick(!kick);
    }
    const submitmute = (e:any)=>{
        e.preventDefault();
        const time:any = document.getElementById('time');
        if (time)
        {
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/mute?id=${reciver.reciver.id}&tomute=${data.user.id}&time=${time.value}`,
            {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            })
            setClick(!click);
        }
    }
    if (data.user.id == user.user.id)
        return(<></>)
    if(kick)
        return(<></>)
    return(
        <div className=" p-1 w-full flex justify-between hover:bg-sky-800">
            <div className="flex ">
                <img className="w-10 h-10 rounded-full" src={data.user.avatar} alt="No image" />
                <h1 className="p-1">{data.user.username}</h1>
            </div>
            <div className='p-2'>
                {(reciver.reciver.me != "user")&&<button onClick={() => setClick(!click)}><SlOptionsVertical/> </button>}
                {
                    (click) &&
                    <div className='bg-[#18184a] flex flex-col absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] p-4 rounded-lg'>
                        <div>
                            <Button onClick={()=>setActions(!action)} className='m-1' colorScheme='teal' variant='outline'>Actions</Button>
                            <Button onClick={()=>setActions(!action)} className='m-1' colorScheme='teal' variant='outline'>Add</Button>
                        </div>
                        {action && 
                            <div>
                                <form className='flex' onSubmit={submitmute}>
                                    <Input variant='outline' placeholder='Time' type="number"  min="1" max="5" />
                                    <Button onClick={submitmute} colorScheme='whatsapp' type="submit">mute</Button>
                                </form>
                                <div className='flex flex-col'>
                                    <Button className='m-1' onClick={handlekick} colorScheme='red' variant='outline'>Kick</Button>
                                    <Button className='m-1' onClick={handleban} colorScheme='red' variant='outline'>Ban</Button>
                                    <Button className='m-1' onClick={addAdmin} colorScheme='green' variant='outline'>Add as Admin</Button>
                                </div>
                            </div>
                        }
                        {
                            !action &&
                            <div>
                                <form className='flex' onSubmit={()=>{}}>
                                <Input variant='outline' placeholder='username' type="string" />
                                <Button colorScheme='whatsapp' type="submit">add</Button>
                                </form>
                            </div>

                        }
                        {/* <button onClick={handlekick} className='hover:bg-[#363672] w-full flex m-1'>kick</button>
                        <button onClick={handleban} className='hover:bg-[#363672] w-full flex m-1'>ban</button> */}
                    </div>
                //     <div className='bg-[#18184a] absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] p-4 rounded-lg '>
                //     <button onClick={handlemute} className='hover:bg-[#363672] w-full flex m-1'>mute</button>
                //     {mute &&
                //         <div>
                //         <form onSubmit={submitmute}>
                //             <input id='time' className='rounded-full bg-[#363672] p-1 mb-1' type="number" 
                //             placeholder='time to mute' min="1" max="5"/>
                //             <input className='bg-green-600 rounded-full p-1 m-1' type="submit" value="mute"/>
                //         </form>
                //         </div>}
                //     <button onClick={handlekick} className='hover:bg-[#363672] w-full flex m-1'>kick</button>
                //     <button onClick={handleban} className='hover:bg-[#363672] w-full flex m-1'>ban</button>
                // </div>
                }
            </div>
        </div>
    ) 
}