import ProfileAvatar from "./ProfileAvatar";
import Cookies from 'js-cookie';
import useSWR from "swr"
import { useEffect, useState } from "react";
import UserRank from "./UserRank";

  interface props{
    avatar:string,
    email:string,
    username:string,
    rank:string,
    avatar_updated:boolean,
    id:number,
    status:boolean,
    isIngame:boolean
  }


const ProfileHeader = (props:props) => {


  let button_placeholder = 'request';
  
  const [status, setstatus] = useState("")
 
  const [blockstatus, setBlockStatus] = useState(false)
  const [blockString, setBlockString] = useState("Block")
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/block/status/${props.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
        const jsonData = await response.json();
        console.log(jsonData.status)
        if (jsonData.status === 'blocked')
        {
            setBlockString('Unblock')
            setBlockStatus(true);
        }
        else if (jsonData.status === 'waiting-for-unblock')
        {
            setBlockString('You Are Blocked')
            setBlockStatus(true);
        }
            
        else if (jsonData.status === 'not-sent')
            setBlockString('Block')
        else
            setBlockString('Block')
             
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  

  const fetchFriendStatus = async (url:string) => {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`
           }});

      return res.json();
  }


  const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/status/${props.id}`,
  fetchFriendStatus
  );

  if (!data)
      return null;

  

    const send_request = () =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/send/${props.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => setstatus("cancel"))
    }
    


    const handel_response_user = (friendRequestId:string, user_response:string) =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/response/${friendRequestId}`, {
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({ status: user_response })
            
          }).then((response) => response.json())
          .then(data => user_response == 'accepted' ? setstatus('unfriend') : setstatus(data.status))
    }

    const deleteFriendRequest = (friendRequestId:string) =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/remove/${friendRequestId}`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'Content-Type': 'application/json'
                },
            
          });
    }

    const blockFriend = () =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/block/${props.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => console.log(data))
    }

    




    if (data.status === 'pending')
        button_placeholder = 'cancel';
    else if (data.status === 'not-sent')
        button_placeholder = 'Add Friend';
    else if (data.status === 'waiting-for-current-user-response')
        button_placeholder = 'accept';
    else if (data.status === 'accepted')
        button_placeholder = 'unfriend';
    else if (data.status === 'declined')
        button_placeholder = 'Add Friend';







        const handel_block = () =>
        {
            if (blockString === 'Block' &&  data.status === 'not-sent'){
                blockFriend();
                setBlockString('Unblock')
                setBlockStatus(true);
            }
            else if (blockString === 'Unblock')
            {
                deleteFriendRequest(data.id);
                setBlockString('Block')
                setBlockStatus(false);
            }
            else if (blockString === 'waiting-for-unblock')
            {
                console.log('waiting-for-unblock')
            }
            else
            {
                deleteFriendRequest(data.id);
                blockFriend();
                setBlockString('Unblock')
                setBlockStatus(true);
            }

        }



        const handel_all_request = () =>
        {
    
            if (data.status === 'pending'){
                deleteFriendRequest(data.id);
                button_placeholder = 'Add Friend';
                setstatus('Add Friend')
            }
            else if (data.status === 'not-sent')
            {
                
                send_request();
                button_placeholder = 'cancel';
                setstatus('cancel')
                console.log("requested")
            }
            else if (data.status === 'waiting-for-current-user-response')
            {
                handel_response_user(data.id, 'accepted');
                button_placeholder = 'Unfriend';
                console.log("accepted")
            }
            else if (data.status === 'accepted')
            {
                deleteFriendRequest(data.id);
                button_placeholder = 'Add Friend';
                setstatus('Add Friend')
                console.log("unfriend")
            }
            else if (data.status === 'declined')
            {
                button_placeholder = 'request';
                send_request();
                console.log("requested")
            }
            
            setstatus(button_placeholder)
        }



    return (
        
        <div className="flex items-center justify-between mb-6 flex-wrap">
    <div className="flex items-center">
     
      <div className="relative">
       
       <ProfileAvatar img={props.avatar} username={props.username} avatar_updated={props.avatar_updated} id={props.id} status={props.status}/>
        
      </div>
      <div className="ml-4">
      
        <h1 className="text-3xl font-semibold text-blue-500">{props.username}</h1>
        <p className="text-gray-600">{props.email}</p>
        <p className={`${`${props.isIngame ? 'block' : 'hidden'} text-blue-600 font-semibold my-[4px]`}`}>Player In Game...</p>
       
         
        <UserRank id={props.id}/>
      
      </div>
    </div>

    



    <div className="py-4">
    {blockstatus == false &&  <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={handel_all_request}>{status?status:button_placeholder}</button>
}
{blockString != 'You Are Blocked' &&   <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-4 rounded-lg" onClick={handel_block}>{blockString}</button>  
}

{blockString == 'You Are Blocked' &&    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-4 rounded-lg cursor-help" >{blockString}</button>  
}
    </div>
      
      

  </div>
    );
};
export default ProfileHeader;
