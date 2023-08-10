"use client"
import './profile.css'
import {Friends, Groups, ProfileAvatar, ProfileInfo, History, Achievevements} from './index'

import Cookies from 'js-cookie';
import useSWR from "swr"
import { useRouter } from 'next/navigation';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';
import ProfileState from './components/ProfileState';



export default  function Profile()
{
    const router = useRouter();

    const fetchProfileData = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});

    if (res.status == 401)
        router.replace("/login")
             
    if (!res.ok)
        throw new Error("failed to fetch users");
    return res.json();
}


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/me`,
    fetchProfileData
    );
    // let stored_data = ['true', data?.profile_img, data?.username, data?.id, data?.isTwoFactorAuthenticationEnabled]
    // sessionStorage.setItem('isLoget', stored_data[0]);
    
    // sessionStorage.setItem('username', stored_data[2]);
    // sessionStorage.setItem('userId', stored_data[3]);
    // sessionStorage.setItem('isTwoFactorAuthenticationEnabled', stored_data[4]);


    if (!data)
        return null;
    
    return(
        
        <div className="container mx-auto px-2 py-10">
                <ProfileHeader avatar={data.profile_img} username={data.username} email={data.email} rank={data.rank}
                avatar_updated={data.is_profile_img_updated} 
                />
  
                <ProfileState/>




             <Tabs position="relative" variant='soft-rounded' colorScheme='blue' isFitted className="text-gray-500">
                         <TabList mb='1em'>
                             <Tab>History </Tab>
                             <Tab>Friends </Tab>
                             <Tab>Achievevements</Tab>
                         </TabList>

                 
                         <TabPanels>
                             <TabPanel>
                             <History/>
                             </TabPanel>
                             <TabPanel>
                             <Friends/>
                            
                             </TabPanel>
                            
                             <TabPanel>
                             <Achievevements/>
                            </TabPanel>
                         </TabPanels>
                 </Tabs>

        </div>
    
        
    );
}