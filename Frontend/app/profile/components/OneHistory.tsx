import { Avatar, AvatarBadge } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"

const OneHistory = () => {
    const router = useRouter();
    let myFriends;
    
    const fetchFriends = async (url:string) => {
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`,
    fetchFriends
    );



    if (data)
    {
        myFriends = data.map(friend => {
            return <div className="victory_div" key={friend.id}>
            <div className="info_victory">
                <p>Score:    2036</p>
                <p>Rank:     +56</p>
            </div>
        
            <div className="result_victory">
                <p>Victory</p>
                <p>8 vs 6</p>
            </div>
        
            <div className="game_victory"><div className="game_victory" ><Avatar  size='md' name={friend.username} src={friend.profile_img} >
            <AvatarBadge boxSize='1em' bg='green.500' borderColor='#18184a'/>
            </Avatar>
             </div>
             </div>
</div>
        })
    }
    return (
        <div>
             {myFriends ? myFriends : "No friend!"}
        </div>
        
    
    );
};
export default OneHistory;