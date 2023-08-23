
import { BsFillInfoCircleFill } from 'react-icons/bs'
import reciverContext from '../reciverContext'
import { useContext } from 'react';
import activeContext from '../activeContext';
import {IoMdArrowRoundBack} from 'react-icons/io'
import { handleClientScriptLoad } from 'next/script';
import { info } from 'console';

export default function Profile(props:any)
{
    const active = useContext(activeContext);
    const reciver = useContext(reciverContext);
    const handleclick = () =>{active.setActive('chats')}
    const info_click = () => {active.setActive('info')}
    return (
        <div className="container flex border-b-2 border-gray-500 pb-3 justify-between">
            <div className="flex">
                <div className='sm:hidden mt-3 p-3 rounded-full'>
                    <button onClick={handleclick}><IoMdArrowRoundBack /></button>
                </div>
                <img className="w-12 rounded-full m-2" src={reciver.reciver.avatar} alt=""/>
                <p className="m-2 mt-4">{reciver.reciver.username}</p>
            </div>
            <div className='md:hidden m-4 mt-6 hover:bg-gray-500 rounded-full h-6 w-6'>
                <button onClick={info_click}><BsFillInfoCircleFill/></button>
            </div>
        </div>
    )
}