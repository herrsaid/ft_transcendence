import { Avatar, AvatarBadge} from "@chakra-ui/react";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"

interface history{
    score:number,
    rank:number,
    myresult:number,
    enemmyresult:number,
    enemmyuserid:number

}


const OneHistory = (props:history) => {
     



    const router = useRouter();
    let new_src_img:string = '';
    
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/id/${props.enemmyuserid}`,
    fetchFriends
    );


    if (!data)
        return null;

    if (data.is_profile_img_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + data.profile_img;
    return (

     
        <div className={`stats-bgf p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105 flex items-center justify-between`}>
            <div className="">
                <p>Score:    {props.score}</p>
                <p>Rank:      {props.rank}</p>
            </div>

           <div>
                <p className={`${props.myresult > props.enemmyresult ? 'text-blue-500' : 'text-yellow-500'}`}>{props.myresult > props.enemmyresult ? 'Victory' : 'Loss'} </p>
                <p className={`${props.myresult > props.enemmyresult ? 'text-blue-500' : 'text-yellow-500'}`}>{props.myresult} vs {props.enemmyresult}</p>
            </div>


            <div className="">
                <Link href={`/user?username=${data.username}`}>
                <Avatar  size='md' name={data.username} src={data.is_profile_img_updated ? new_src_img : data.profile_img} >
            <AvatarBadge boxSize='1em' bg={data.status ? 'green.500' : 'tomato'} borderColor='#18184a'/>
            </Avatar>
                </Link>
                
             </div>
      
      </div>        
    
    );
};
export default OneHistory;