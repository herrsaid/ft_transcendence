
import { useContext } from 'react'
import {FaHashtag} from 'react-icons/fa'
import reciverContext from '../reciverContext'
import activeContext from '../activeContext';
import Cookies from 'js-cookie';

export default function Group({group}:any) {
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const group_click = () =>{
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/access?id=${group.id}`,
        {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then(res => res.json()).then(data => {
            if (data.status == true)
            {
                if (reciver.reciver.isgroup == true)
                {
                    if (reciver.reciver.id != group.id)
                        reciver.setReciver({isgroup:true, id:group.id, name:group.name,me:group.role,size:group.size,members:[]});
                }
                else
                {
                    reciver.setReciver({isgroup:true, id:group.id, name:group.name,me:group.role,size:group.size,members:[]});
                }
                active.setActive('message');
            }
        });
    }
    return(
        <div onClick={group_click} className="flex hover:bg-[#7d32d9] cursor-pointer">
            <div className='p-1'>
                <FaHashtag size={35} />
            </div>
            <div className='p-2'>
                <h1>{group.name}</h1>
            </div>
        </div>
    )
};
