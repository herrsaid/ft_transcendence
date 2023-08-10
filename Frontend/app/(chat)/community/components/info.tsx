
import {ImBlocked} from 'react-icons/im'

export default function Info()
{
    return (
        <div className="flex flex-col h-full justify-between self-center">
            <div className="self-center ">Info</div>
            <div className="self-center">hhhhh</div>
            <div className="self-center">
                <div className="rounded-lg w-1/1 h-[100px] bg-sky-900">
                    <div className="flex p-2">
                        <ImBlocked color='red'/>
                        <p className='text-red-500'>Block this Perosn</p>
                    </div>
                </div>
            </div>
        </div>
    )
}