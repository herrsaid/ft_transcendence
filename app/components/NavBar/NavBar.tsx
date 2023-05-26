'use client'

import Link from 'next/link'
import './NavBar.css'
import Header from '../Header';
import { useState } from 'react';

export default function NavBar()
{
    const [targetX, setTargetX] = useState({start:0,end:0});
    return(
        <Header  setTargetX={setTargetX}  targetX={targetX}/>
    );
}