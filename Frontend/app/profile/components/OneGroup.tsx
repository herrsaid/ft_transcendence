import { Avatar, AvatarGroup } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"


const OneGroup = () => {

    const router = useRouter();
    let myFriends;
    
    const fetchFriends = async (url:string) => {
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`,
    fetchFriends
    );

    if (data)
    {
        myFriends = data.map(friend => {
            return <Avatar key={friend.id} 
            name={friend.username} 
            src={friend.profile_img}
            />
        })
    }

    return (
        <div className="group">
        <div className="inside_group">
            
            <h4>Legends</h4>
            </div>

            <p className="memebers">
                <AvatarGroup size='md' max={5}>
  {myFriends ? myFriends : "No memebers!"}
</AvatarGroup>
                </p>

        </div>
        
    );
};
export default OneGroup;