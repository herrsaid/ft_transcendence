'use client'

import Stream from './Stream';
import { useRouter } from 'next/navigation'
import './Stream.css'
const page = () => 
{
    const router = useRouter();
    return(
        <div id='Game'>
            <Stream router={router}/>
        </div>
    );
}

export default page;