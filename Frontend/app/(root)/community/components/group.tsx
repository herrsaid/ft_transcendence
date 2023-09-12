
import { useContext } from 'react'
import {FaHashtag} from 'react-icons/fa'
import reciverContext from '../reciverContext'
import activeContext from '../activeContext';

export default function Group({group}:any) {
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const group_click = () =>{
        reciver.setReciver({isgroup:true, id:group.id, name:group.name,me:group.role});
        active.setActive('message');
    }
    return(
        <div onClick={group_click} className="flex hover:bg-sky-900 cursor-pointer">
            <div className='p-1'>
                <FaHashtag size={35} />
            </div>
            <div className='p-2'>
                <h1>{group.name}</h1>
            </div>
        </div>
    )
};
