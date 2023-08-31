'use client'
import Cookies from 'js-cookie';
import useSWR from "swr"
import OneFriend from '../profile/components/OneFriend';
import SearchInput from '../Components/SearchInput/SearchInput';

export default  function Users()
{
    let myFriends;
    
    const fetchFriends = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
    return res.json();
}


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`,
    fetchFriends
    );



    if (data)
    {
        myFriends = data.map((friend:any) => {
            return <div  key={friend.id} className='mb-2'><OneFriend 
            image={friend.profile_img}  
            username={friend.username} 
            status={friend.status}
            id={friend.id}
            avatar_updated={friend.is_profile_img_updated}
            />
            </div>
            
        })
    }
    return(
        <div className="container mx-auto px-2 py-10 pb-32">
        <div className="w-full p-6 rounded-lg shadow-md mx-auto items-center">
            <div className="w-[300px] mx-auto items-center">
        <h1 className="text-2xl font-semibold mb-4">Find Friends</h1>
        <div className=' mb-6'>
        <SearchInput/>
        </div>
        

       
            
            {myFriends ? myFriends : "No friend!"}   
           
            </div>
    </div>
    </div>
    );
}