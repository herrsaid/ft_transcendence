import { useEffect, useState, useContext } from "react";
import Group from "./group";
import Cookies from 'js-cookie';
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form'
import UserContext from "../../UserContext";
import useSWR from "swr";
import GroupSettings from "./GroupSettings";
  
  export default function Groups()
  {
    const [isOpen, setIsOpen] = useState(false);
    const [group, setGroup] = useState([]);
    const user = useContext(UserContext);
    const hrf = useForm()
    const onSubmit = hrf.handleSubmit(data =>{
      fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/create`,{
        method: 'POST', headers:{
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:data.name, user:user.user.id})
    })
    })
    const fetcher = (args:string) => fetch(args,{
      method: 'GET',
      headers:{
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      }
    }).then((response) => response.json())
    const {data,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/mygroups?id=${user.user.id}`, fetcher);
    // useEffect(()=>{
    //   fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/mygroups?id=${user.user.id}`,{
    //     method: 'GET',
    //     headers:{
    //       Authorization: `Bearer ${Cookies.get('access_token')}`,
    //     }
    //   }).then((response) => response.json()).then(data => setGroup(data))
    // },[])
    if (isLoading)
      return (<>is lading</>)
    return (
        <div className="flex flex-col justify-between h-[100%]">
            <div >
              {
                data.map((data:any, index:number) => {return(<Group key={index} group={data}/>)})
              }
            </div>
            <div className="self-center fixed bottom-4">
                <button className="bg-green-600 rounded-lg p-1" onClick={()=>setIsOpen(true)}>New Group</button>
            </div >
            {isOpen && <GroupSettings></GroupSettings>}
        </div>
    )
}