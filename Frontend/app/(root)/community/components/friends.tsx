
import activeContext from "../activeContext";
import reciverContext from "../reciverContext";
import { useContext } from "react";

export default function Friend(props:any)
{
    const active = useContext(activeContext);
    const reciver = useContext(reciverContext);
    const click = ()=>{reciver.setReciver({username:props.username,avatar:props.avatar,id:props.id}); active.setActive('message')};
    return(
        <div onClick={click} className="flex hover:bg-[#7d32d9] cursor-pointer">
            <div className="w-10 m-2">
                <img className="rounded-full" src={props.avatar} alt="friend" />
            </div>
            <div className="ml-3 mt-4">
                <p>{props.username}</p>
            </div>
        </div>
    );
}