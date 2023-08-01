import { Avatar, AvatarGroup, Box, Flex, Spacer } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"


const OneGroup = () => {
    let new_src_img:string;
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
            if (friend.is_profile_img_updated)
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + friend.profile_img;
            return <Avatar key={friend.id} 
            name={friend.username} 
            src={friend.is_profile_img_updated ? new_src_img : friend.profile_img}
            />
        })
    }

    return (
                    <Flex>

                    <Box p='4'>

                    <h4 className="group_name">Legends</h4>

                    </Box>

                    <Spacer />

                    <Box p='4' >

                    <AvatarGroup size='md' max={7}>
  {myFriends ? myFriends : "No memebers!"}
</AvatarGroup>

                    </Box>

                    </Flex>
        
    );
};
export default OneGroup;