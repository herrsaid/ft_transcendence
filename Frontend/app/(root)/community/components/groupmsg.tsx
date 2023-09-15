import { useContext } from "react"
import reciverContext from "../reciverContext"


export default function GroupMsg({content}:any)
{
    
    const reciver = useContext(reciverContext);
    const user = reciver.reciver.members.find((data:any) => (data.user.id == content.member)).user
    return(
        <div className={content.class}>
            <div>
                <img className="h-12 w-12 rounded-full" src={user.profile_img} alt="" />
            </div>
            <div>
                {content.content}
            </div>
        </div>
    )
}