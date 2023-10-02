'use client'
import './Home.css'
import LiveGames from './Components/LiveGames'
import LeaderBoard from './LeaderBoard/LeaderBoard'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
    
   
  <div className="container mx-auto h-[90vh] scroll-auto overflow-scroll pb-10">
    
  <Tabs position="relative" variant='soft-rounded' colorScheme='blue' isFitted className="text-gray-500">
                         <TabList mb='1em'>
                             <Tab>DachBoard </Tab>
                             <Tab>LeaderBoard </Tab>
                             
                         </TabList>

                 
                         <TabPanels>
                             <TabPanel>
                             <LiveGames/>
                             </TabPanel>
                             <TabPanel>
                             <LeaderBoard/>
                            
                             </TabPanel>
                            
                      
                         </TabPanels>
                 </Tabs>





   
    
    

  </div>


    </>
  )
}