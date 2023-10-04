
import { useContext } from 'react'
import {FaHashtag} from 'react-icons/fa'
import reciverContext from '../reciverContext'
import activeContext from '../activeContext';

export default function Group({group}:any) {
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const group_click = () =>{
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
    return(
        <div onClick={group_click} className="flex hover:bg-[#7d32d9]cursor-pointer">
            <div className='p-1'>
                <FaHashtag size={35} />
            </div>
            <div className='p-2'>
                <h1>{group.name}</h1>
            </div>
        </div>
    )
};
