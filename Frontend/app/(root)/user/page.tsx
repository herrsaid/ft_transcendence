"use client"
import {  useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import useSWR from "swr"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import ProfileUserState from './Components/ProfileUserState';
import HistoryUser from './Components/HistoryUser';
import { useContext } from "react";
import UserContext from '../UserContext';
import UserAchievevements from './Components/UserAchievevements';
import '../profile/profile.css'
import ProfileHeaderUser from './Components/ProfileHeaderUser';
import ProfileHeader from '../profile/components/ProfileHeader';

export default  function User()
{
    const router = useRouter();
    const searchParams = useSearchParams()
    const username = searchParams?.get('username')
    const usercontext = useContext(UserContext);


    // if (usercontext.user.username == username)
    // {
    //     router.push('/profile')
    // }
    const fetchUserData = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
        return res.json();
    }


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/${username}`,
    fetchUserData
    );


    if (isLoading)
    {
        return <div className="container mx-auto px-2 py-10">
            <Box padding='6' boxShadow='md' bg='#39396f' borderRadius={25}>
                
            <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
         </Box>
                </div>
    }

    if (!data)
        return <div className="container mx-auto px-2 py-10 pb-32">User Not Found</div>;


    return(
       

                <div className="container mx-auto px-2 py-10 pb-32 h-[90vh] scroll-auto overflow-scroll">
                    
                    {usercontext.user.username == username && <ProfileHeader  username={usercontext.user.username} email={usercontext.user.email} rank={usercontext.user.rank} 
                />}
                {usercontext.user.username != username && <ProfileHeaderUser  avatar={data.avatar} username={data.username} email={data.email} rank={data.rank}
                 id={data.id} status={data.status} isIngame={data.isInGame}/>}
                            
      
                <ProfileUserState id={data.id}/>
    


            <Tabs position="relative" variant='soft-rounded' colorScheme='blue' isFitted>
                        <TabList mb='1em'>
                            <Tab>History </Tab>
                            <Tab>Achievevements</Tab>
                        </TabList>

                 
                        <TabPanels>
                            <TabPanel>
                            <HistoryUser id={data.id}/>
                            </TabPanel>
                            <TabPanel>
                            <UserAchievevements id={data.id}/>
                            </TabPanel>
                        </TabPanels>
                </Tabs>
                </div>

    );
}