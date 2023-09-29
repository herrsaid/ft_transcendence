import { useContext } from "react"
import reciverContext from "../reciverContext"


export default function GroupMsg({content}:any)
{
    
    const reciver = useContext(reciverContext);
    const user = reciver.reciver.members.find((data:any) => (data.user.id == content.member))
    const currentDate = new Date();
    const now = currentDate.getHours()  + ':' + currentDate.getMinutes()
    if(user == undefined)
        return(null)
    if (content.class == 'me')
    {
        return(
            <div className="flex self-end ml-1">
                <div className="bg-[#34346e]  drop-shadow-md m-1 rounded-md max-w-[300px]">
                <div className="flex flex-col mr-1 self-end">
                        <div className="text-xs text-gray-300">
                            {user.user.username}
                        </div>
                        <div className="bg-[#7d32d9] drop-shadow-md p-2 rounded-md max-w-[300px]">
                            {content.content}
                        </div>
                    </div>
                </div>
                <div>
                    <img className="h-8 w-8 rounded-full" src={user.user.avatar} alt="" />
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div className="flex self-start ml-1 ">
                <div>
                    <img className="h-8 w-8 rounded-full" src={user.user.avatar} alt="" />
                </div>
                <div className="drop-shadow-md rounded-md ml-1 max-w-[300px]">
                    <div className="flex flex-col">
                        <div className="text-xs text-gray-300">
                            {user.user.username}
                        </div>
                        <div className="bg-[#7d32d9] drop-shadow-md p-2 rounded-md max-w-[300px]">
                            {content.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
            
}