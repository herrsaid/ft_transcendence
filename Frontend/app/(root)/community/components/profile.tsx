
import { SlOptionsVertical } from 'react-icons/sl'
import reciverContext from '../reciverContext'
import { useContext } from 'react';

export default function Profile(props:any)
{
    const reciver = useContext(reciverContext);
    return (
        <div className="container flex border-b-2 border-gray-500 pb-3 justify-between">
            <div className="flex">
                <img className="w-12 rounded-full m-2" src={reciver.reciver.avatar} alt=""/>
                <p className="m-2 mt-4">{reciver.reciver.username}</p>
            </div>
            <div className='m-4 mt-6 hover:bg-gray-500 rounded-full h-6 w-6'>
                <SlOptionsVertical size={20}/>
            </div>
        </div>
    )
}