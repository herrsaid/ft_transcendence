"use client"
import '../profile/profile.css'
import {ProfileAvatar, ProfileInfo} from './index'
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import useSWR from "swr"
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Achievevements, Friends, Groups, History } from '../profile';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
export default  function User()
{
    const router = useRouter();
    const searchParams = useSearchParams()
    const username = searchParams?.get('username')


    const fetchUserData = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});

        if (res.status == 401)
            router.replace("/")
             
        if (!res.ok)
            throw new Error("failed to fetch users");
        return res.json();
    }


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/${username}`,
    fetchUserData
    );

    if (isLoading)
    {
        return <div className="profile_container">
            <div className="all_profile">
            <div className="side_two">
            <div className="side_two_info">
            <Box padding='6' boxShadow='md' bg='#39396f' borderRadius={25}>
                
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                    
                    
                
                </Box>
                </div>
                </div>
                </div>   
        </div>
    }

    if (!data)
        return null;


    return(
       
<div className="profile_container">

<div className="all_profile">
<div className="side_two">
                
                <div className="side_two_info">

                    <ProfileAvatar  img={data.profile_img}   username={data.username} id={data.id} avatar_updated={data.is_profile_img_updated} status={data.status}/>                     
                    
                    <ProfileInfo location={data.location} totalgame={data.totalgame}
                    loss={data.loss} wins={data.wins} rank={data.rank}      />

                 </div>
                
</div>

    


            <Tabs position="relative" variant='soft-rounded' colorScheme='blue' isFitted>
                        <TabList mb='1em'>
                            <Tab>History </Tab>
                            <Tab>Friends </Tab>
                            <Tab>Community </Tab>
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
                            <Groups/>
                            </TabPanel>
                            <TabPanel>
                            <Achievevements/>
                            </TabPanel>
                        </TabPanels>
                </Tabs>
    

</div>
 </div>

    );
}