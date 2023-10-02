'use client'


import CardColum from "./CardColum";
import CardLeader from "./CardLeader";
import Cookies from 'js-cookie';
import useSWR from "swr"

export default function LeaderBoard() {


    let users;
    let userspartone;
    let first  = <></>;
    let second = <></>;
    let therd = <></>;
    
    const fetchLeaders = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
    return res.json();
}


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/leaderboard/users`,
    fetchLeaders
    );

    try{
        if (!data.length)
    {
        return (
            <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        
                
        <div className="live-game-card stats-bgf rounded-lg shadow-md p-6 flex flex-col justify-between">
        
        <p className="text-white">we dont have matchs yet!</p>

      </div>
        
        </div>
      </main>
        )
        
    }
    }
    catch{
        
        return (
           null
        )
    }


    if (data)
    {
        users = data.map((user:any, index:any) => {
            if (index > 2)
            {
                return <CardColum key={user.id} 
                image={user.avatar}  
                username={user.username} 
                rank={index+1}
                />
            }
        })

            
        
    }

    if (data)
    {
        
        userspartone = data.map((user:any, index:any) => {
            if (index == 0)
            {
                first =  <div key={user.id} className="b p-10 stats-bg h-[70%] ml-5 mr-5 rounded-md transform transition-transform duration-300 hover:scale-105"> <CardLeader image={user.avatar} username={user.username} rank={index+1}/></div>
            }
            else if (index == 1)
            {
                second = <div key={user.id} className=" p-10 stats-bg h-[70%] mt-8 rounded-md transform transition-transform duration-300 hover:scale-105"><CardLeader image={user.avatar} username={user.username} rank={index+1}/></div>

            }
            else if (index == 2)
            {
                therd = <div key={user.id} className=" p-10 stats-bg h-[70%] mt-8 rounded-md transform transition-transform duration-300 hover:scale-105"> <CardLeader image={user.avatar} username={user.username} rank={index+1}/></div>
            }
        })

            
        
    }





  return (
    <>
    
   <div className="container mx-auto">

<div className="flex justify-center h-90 flex-wrap"> 
    
    {second ? second : null}
    {first ? first : null}
    {therd ? therd : null}

</div>
<div className="flex flex-col scroll-auto mx-auto overflow-scroll w-[300px] h-[300px]">
   {users}
   
    
</div>

   </div>


    </>
  )
}