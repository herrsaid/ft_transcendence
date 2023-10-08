
import {ImBlocked, ImInfo} from 'react-icons/im'
import { GoReport } from "react-icons/go";
import {useContext, useEffect, useState } from 'react';
import reciverContext from '../reciverContext';
import Cookies from 'js-cookie';
import activeContext from '../activeContext';
import { Display } from '../Settings/SettingsFuntions/Display';
import Groupinfo from './groupinfo';
import {BiArrowBack} from 'react-icons/bi'
import Settings from '../Settings/Components/SettingsComponent';
import useSWR from 'swr';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Info()
{
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const [status, setStatus] = useState('');
    const [statusBtn, setStatusBtn] = useState<any>();
    const back_click = ()=>{active.setActive('message')}
    const router = useRouter();
    const fetchData = async (url:string) => {
        try{
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }});
                    return res.json();
        }
        catch{
             console.log("error");
        }
        }
    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/block/status/${reciver.reciver.id}`, fetchData)
    const block = () => 
    {
        setStatusBtn(<button className='btn btn-error w-full' onClick={Unblock} >Unblock</button>)
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/block/${reciver.reciver.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
        //   .then(data => setStatus(data.status))
    }
    const Unblock = () => 
    {
        if (data)
        {
            setStatusBtn(<button className='btn btn-error w-full' onClick={block} >Block</button>)
            fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/unblock/users/${reciver.reciver.id}`, {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
            }})
        }
    }
    useEffect(() => {
        if (data)
        {
            setStatus(data.status)
            if (status != 'blocked')
            {
                setStatusBtn(<button className='btn btn-error w-full' onClick={block}>Block</button>)
            }
            else if (status == "blocked")
                setStatusBtn(<button className='btn btn-error w-full' onClick={Unblock}>Unblock</button>)
        }
    }, [data, status])
    if(!reciver.reciver.id)
        return (null)
    if (reciver.reciver.isgroup)
        return (<Groupinfo/>)
    return (
        <div className="flex flex-col h-full justify-sart">
            <div className='flex flex-col self-center rounded-lg bg-[#363672] w-[90%] h-[50%] justify-start' >
                <div className='mb-5 flex'>
                    <div onClick={back_click} className='p-3 sm:hidden hover:bg-[#7d32d9] '><BiArrowBack></BiArrowBack></div>
                </div>
                <div className='self-center border-2 rounded-full border-[#7d32d9]'>
                    <img className='w-24 h-24 rounded-full border-2' src={reciver.reciver.avatar} alt="" />
                </div>
                <div className='self-center'>
                    <h1>{reciver.reciver.username}</h1>
                </div>
                <div className='self-center'>
                    <Link className='btn btn-outline btn-info' href={`/user?username=${reciver.reciver.username}`}>Viste Pofile</Link>
                </div>
            </div>
            {
                ( data && data.status != 'waiting-for-unblock') && <div className='flex justify-between w-[90%] self-center p-1'>
                    <div className='w-1/2 m-1'>
                        {statusBtn}
                    </div>
                    <div className=' w-1/2 m-1'>
                        <button className='btn btn-success w-full' onClick={Display} >invite</button>
                    </div>
            </div>
            }
            {
                (data && data.status == 'waiting-for-unblock') && <div className='flex justify-between w-[90%] self-center p-1'>
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! You Are Blocked.</span>
                        </div>
                </div>

            }
            <Settings/>
        </div>
    )
}
