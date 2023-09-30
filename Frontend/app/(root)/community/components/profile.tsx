
import { BsFillInfoCircleFill } from 'react-icons/bs'
import reciverContext from '../reciverContext'
import { useContext } from 'react';
import activeContext from '../activeContext';
import {IoMdArrowRoundBack} from 'react-icons/io'
import { handleClientScriptLoad } from 'next/script';
import { info } from 'console';
import {FaHashtag} from 'react-icons/fa'

export default function Profile(props:any)
{
    const active = useContext(activeContext);
    const reciver = useContext(reciverContext);
    const handleclick = () =>{active.setActive('chats')}
    const info_click = () => {active.setActive('info');alert('jjjjjjj')}
    return (
        <div className="container flex h-20 top-0 sticky justify-between rounded-xl">
            <div className="flex">
                <div className='sm:hidden mt-3 p-3 rounded-full'>
                    <button onClick={handleclick}><IoMdArrowRoundBack /></button>
                </div>
                <div className='mt-2 flex'>
                    {(!reciver.reciver.isgroup)?<img className="w-12 h-12 rounded-full m-2" src={reciver.reciver.avatar} alt=""/>: <div className='w-12 h-12 rounded-full mt-3 ml-3'><FaHashtag size={35} color='#18184a' /></div>}
                    <p className="m-2 mt-4">{(reciver.reciver.isgroup)?reciver.reciver.name:reciver.reciver.username}</p>
                </div>
            </div>
            <div className='md:hidden m-4 mt-6 hover:bg-gray-500 rounded-full h-6 w-6'>
                <button onClick={info_click}><BsFillInfoCircleFill/></button>
            </div>
        </div>
    )
}