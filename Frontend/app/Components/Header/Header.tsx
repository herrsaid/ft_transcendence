'use client';
import './Header.css'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import SearchInput from '../SearchInput/SearchInput';
import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';

function Login()
{
    const [open, setOpen] = useState(false);
    return(
        <div>
            <img onClick={()=>{setOpen(!open)}} src={sessionStorage.getItem('avatar')} alt="test" />
            {open && <div className='modal'>
                <ul>
                    <li>
                        <Link href='/profile'><h1>Profile</h1></Link>
                    </li>
                    <li>
                        <h1>Setting</h1>
                    </li>
                    <li>
                        <h1>Logout</h1>
                    </li>
                </ul>
            </div>}
        </div>
    )
}

export default  function Header()
{
    const [login, setLogin] = useState(<button className='login'>Login</button>);
    useEffect(()=>{setLogin(<Login></Login>)},[])
    return(

<Flex minWidth='max-content' alignItems='center' gap='2'>

<Box p='2'>

  <Heading size='md'> <h1 className="logo-search">42PONG</h1></Heading>

</Box>

<Spacer />

<ButtonGroup gap='2'>

<SearchInput/>

<div className='profile'>
           <div className='profile-img'>
                   {login}
                </div>
             </div>

</ButtonGroup>

</Flex>

    )
}