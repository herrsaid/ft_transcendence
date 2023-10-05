import { useEffect, useState, useContext } from "react";
import Group from "./group";
import Cookies from 'js-cookie';
import UserContext from "../../UserContext";
import GroupSettings from "./GroupSettings";
import reciverContext from "../reciverContext";
  
  export default function Groups()
  {
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
      reciver.reciver.action = 0;
    },[reciver.reciver.action, reciver.reciver.id])
    let groups;
    if (group)
    {
      groups = group.map((data:any, index:number) => {return(<Group key={index} group={data}/>)});
    }
    return (
        <div className="flex flex-col justify-between h-[100%]">
            <div >
              {
                  groups
              }
            </div>
            <div className="self-center fixed bottom-4">
              <button className="btn btn-success" onClick={()=> {const id:any = document.getElementById('my_modal_2'); id.showModal()}}>new room</button>
            </div >
            
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-[#18184a]">
                  <GroupSettings></GroupSettings>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
        </div>
    )
}