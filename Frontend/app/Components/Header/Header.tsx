'use client';
import './Header.css'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import SearchInput from '../SearchInput/SearchInput';
import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


function Login()
{
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const logout = async ()  => {
   
        

        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/log-out`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
        });

        console.log(res.status)
        if (res.status == 401)
            router.replace("/login")
        else if (res.status == 200)
            router.replace("/login")
             
    if (!res.ok)
        throw new Error("failed to fetch users");
        };
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
                        <button onClick={logout}><h1>Logout</h1></button>
                        
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

 <h1 className="logo-search">42<span>PONG</span></h1>
  {/* <Heading size='md'> 42PONG</Heading> */}

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