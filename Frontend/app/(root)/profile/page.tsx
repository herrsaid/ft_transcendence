"use client"
import './profile.css'
import {Friends,History, Achievevements} from './index'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProfileHeader from './components/ProfileHeader';
import ProfileState from './components/ProfileState';
import { useContext } from "react";
import UserContext from '@/app/(root)/UserContext';


export default  function Profile()
{

    const usercontext = useContext(UserContext);

    return(
        
        <div className="container mx-auto px-2 py-10 pb-32">
                <ProfileHeader avatar={usercontext.user.profile_img} username={usercontext.user.username} email={usercontext.user.email} rank={usercontext.user.rank}
                avatar_updated={usercontext.user.is_profile_img_updated} 
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