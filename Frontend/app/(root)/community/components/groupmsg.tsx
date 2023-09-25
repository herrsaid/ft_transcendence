import { useContext } from "react"
import reciverContext from "../reciverContext"


export default function GroupMsg({content}:any)
{
    
    const reciver = useContext(reciverContext);
    const user = reciver.reciver.members.find((data:any) => (data.user.id == content.member))
    if(user == undefined)
        return(null)
    if (content.class == 'me')
    {
        return(
            <div className="flex self-end ml-1">
                <div className="bg-[#34346e]  drop-shadow-md m-2 p-2 rounded-md max-w-[300px]">
                    {content.content}
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
                <div className="bg-[#7d32d9]  drop-shadow-md m-2 p-2 rounded-md max-w-[300px]">
                    {content.content}
                </div>
            </div>
        )
    }
            
}