
import {ImBlocked, ImInfo} from 'react-icons/im'
import { GoReport } from "react-icons/go";
import { useContext } from 'react';
import reciverContext from '../reciverContext';
import {IoIosArrowBack} from 'react-icons/io'
import activeContext from '../activeContext';
import { Display } from '../Settings/SettingsFuntions/Display';
import Groupinfo from './groupinfo';
import {BiArrowBack} from 'react-icons/bi'

export default function Info()
{
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const back_click = ()=>{active.setActive('message')}
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
            </div>
            <div className='flex justify-between w-[90%] self-center p-1'>
                <div className='bg-[#363672] p-1 rounded-full w-1/2 flex justify-center hover:bg-[#7d32d9] mr-1'><button className='text-green-500'>invite</button></div>
                <div className='bg-[#363672] p-1 rounded-full w-1/2 flex justify-center hover:bg-[#7d32d9]'><button className='text-red-500' >block</button></div>
            </div>
        </div>
    )
}


{/* <div className="self-center text-2xl pb-3 flex justify-between"><div><button className='sm:hidden' onClick={back_click}><IoIosArrowBack/></button></div><h1>Info</h1> <div></div></div>
            <div className="text-center flex flex-col">
                <div className='w-60 self-center pb-10'>
                    <img className='rounded-full self-center w-36' src={reciver.reciver.avatar} alt="img" />
                </div>
                <div className='text-center text-2xl mb-1'>
                    <h1 className='text-center '>{reciver.reciver.username}</h1>
                </div>
                <hr className="pb-5 border-gray-500"></hr>
                <div>
                    <p className=''>Hi my name is doukalin and i Love lger3a</p>
                </div>
            </div>
            <div className="self-center">
                <div className="rounded-lg w-1/1 bg-sky-900">
                    <div className="flex p-2 hover:bg-indigo-900 cursor-pointer" onClick={()=>{Display()}}>
                        <div className='mt-1'>
                            <ImInfo color='red'/>
                        </div>
                        <p className='text-red-500 ml-2 mt-'>Invite To Play</p>
                    </div>
                    <div className="flex p-2 hover:bg-indigo-900 cursor-pointer">
                        <div className='mt-1'>
                            <ImBlocked color='red'/>
                        </div>
                        <p className='text-red-500 ml-2 mt-'>Block this Perosn</p>
                    </div>
                    <div className="flex p-2 hover:bg-indigo-900 cursor-pointer">
                        <div className='mt-1'>
                            <GoReport />
                        </div>
                        <p className='text-red-500 ml-2'>Report this Perosn</p>
                    </div>
                </div>
            </div> */}