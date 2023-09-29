import { useEffect, useState, useContext } from "react";
import Group from "./group";
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import GroupSettings from "./GroupSettings";
import reciverContext from "../reciverContext";
  
  export default function Groups()
  {
    const [isOpen, setIsOpen] = useState(false);
    const [group, setGroup] = useState([]);
    const user = useContext(UserContext);
    const reciver = useContext(reciverContext);
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/mygroups?id=${user.user.id}`,{
        method: 'GET',
        headers:{
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        }
      }).then((response) => response.json()).then(data => setGroup(data))
    },[reciver.reciver.action, reciver.reciver.id])
    return (
        <div className="flex flex-col justify-between h-[100%]">
            <div >
              {
                group.map((data:any, index:number) => {return(<Group key={index} group={data}/>)})
              }
            </div>
            <div className="self-center fixed bottom-4">
                <button className="bg-green-600 rounded-lg p-1" onClick={()=>setIsOpen(true)}>New Group</button>
            </div >
            {isOpen && <GroupSettings></GroupSettings>}
        </div>
    )
}