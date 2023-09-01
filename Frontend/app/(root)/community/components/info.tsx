
import {ImBlocked, ImInfo} from 'react-icons/im'
import { GoReport } from "react-icons/go";
import { useContext } from 'react';
import reciverContext from '../reciverContext';
import {IoIosArrowBack} from 'react-icons/io'
import activeContext from '../activeContext';
import { Display } from '../Settings/SettingsFuntions/Display';
export default function Info()
{
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const back_click = ()=>{active.setActive('message')}
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="self-center text-2xl pb-3 flex justify-between"><div><button className='sm:hidden' onClick={back_click}><IoIosArrowBack/></button></div><h1>Info</h1> <div></div></div>
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
            </div>
        </div>
    )
}