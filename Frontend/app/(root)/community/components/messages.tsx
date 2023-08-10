import Profile from "./profile";
import {VscSend} from 'react-icons/vsc'

export default function Messages()
{
    return(
        <div className="flex flex-col justify-between h-[94vh] border-r border-l border-gray-500">
            <div>
                <Profile/>
            </div>
            <div className="self-center relative w-[90%] pb-[120px]">
                <form action="">
                    <input className="focus:outline-none rounded-full bg-sky-900 p-1 pl-2 w-full" type="text" placeholder="Message..." />
                    <button className="absolute top-2 right-2" type="submit"><VscSend></VscSend></button>
                </form>
            </div>
        </div>
    )
}