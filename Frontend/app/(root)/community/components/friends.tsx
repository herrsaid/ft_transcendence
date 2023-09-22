
import activeContext from "../activeContext";
import reciverContext from "../reciverContext";
import { useContext } from "react";

export default function Friend({user}:any)
{
    const active = useContext(activeContext);
    const reciver = useContext(reciverContext);
    const click = ()=>{reciver.setReciver(user); active.setActive('message')};
    return(
        <div onClick={click} className="flex hover:bg-[#7d32d9] cursor-pointer">
            <div className="w-10 m-2">
                <img className="rounded-full" src={user.avatar} alt="friend" />
            </div>
            <div className="ml-3 mt-4">
                <p>{user.username}</p>
            </div>
        </div>
    );
}