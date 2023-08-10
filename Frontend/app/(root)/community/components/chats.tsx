import Friend from "./friends";
import { BiSearchAlt } from 'react-icons/bi'
export default function Chats()
{
    return (
        <div className="flex flex-col">
            <div className="text-center text-2xl pb-3">Chats</div>
            <div className="flex justify-around border-b-2 border-gray-500 m-2">
                <div className="hover:bg-sky-900 w-1/2 text-center border-r-2 border-gray-500">friends</div>
                <div className="hover:bg-sky-900 w-1/2 text-center" >groups</div>
            </div>
            <div className="self-center mt-2 mb-2 w-[90%] relative drop-shadow-md">
                <form action="">
                    <input className="bg-sky-900 rounded-full pl-3 pr-2 p-1 focus:outline-none w-full" type="search" placeholder="search..."/>
                    <button className="absolute right-2 top-1" type="submit"><BiSearchAlt size={21}/></button>
                </form>
            </div>
            <div>
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
        </div>
    )
}