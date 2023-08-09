import Chats from "./components/chats";
import Messages from "./components/messages";


export default function Community()
{
    return(
        <div className="flex h-full">
            <div className="w-1/3 "> <Chats /> </div>
            <div className="w-2/3 "><Messages /> </div>
            <div className="w-1/3 ">Info</div>
        </div>
    )
}