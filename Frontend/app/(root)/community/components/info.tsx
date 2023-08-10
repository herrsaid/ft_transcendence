
import {ImBlocked} from 'react-icons/im'
import { GoReport } from "react-icons/go";
export default function Info()
{
    return (
        <div className="flex flex-col h-full w-full justify-between self-center">
            <div className="self-center text-2xl pb-3">Info</div>
            <div className="self-center">
                <div className='w-60 pb-16'>
                    <img className='rounded-full self-center' src="https://xsgames.co/randomusers/assets/avatars/male/42.jpg" alt="img" />
                </div>
                <hr className="pb-5 border-gray-500"></hr>
                <div>
                    <p className=''>Hi my name is doukalin and i Love lger3a</p>
                </div>
            </div>
            <div className="self-center">
                <div className="rounded-lg w-1/1 bg-sky-900">
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