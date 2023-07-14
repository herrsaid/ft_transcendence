'use client'

import './NavBar.css'
import Header from '../Header';
import { useState } from 'react';

export default function NavBar({idd}:any)
{
    const [targetX, setTargetX] = useState({start:0,end:0});
    return(
        <Header setTargetX={setTargetX}  targetX={targetX} idd={idd}/>
    );
}