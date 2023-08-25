

import {HiUserGroup} from 'react-icons/hi'

export default function Group(props:any) {
    return(
        <div className="flex  hover:bg-sky-900 cursor-pointer">
            <div>
                <HiUserGroup size={40} />
            </div>
            <div className='p-2'>
                <h1>groupname</h1>
            </div>
        </div>
    )
};