
import { SlOptionsVertical } from 'react-icons/sl'

export default function Profile()
{
    return (
        <div className="container flex border-b-2 border-gray-500 pb-3 justify-between">
            <div className="flex">
                <img className="w-12 rounded-full m-2" src="https://xsgames.co/randomusers/assets/avatars/male/42.jpg" alt=""/>
                <p className="m-2 mt-4">doukali</p>
            </div>
            <div className='m-4 mt-6 hover:bg-gray-500 rounded-full h-6 w-6'>
                <SlOptionsVertical size={20}/>
            </div>
        </div>
    )
}