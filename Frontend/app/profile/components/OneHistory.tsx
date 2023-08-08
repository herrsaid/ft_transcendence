import { Avatar, AvatarBadge} from "@chakra-ui/react";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import useSWR from "swr"

interface history{
    image:string,
    username:string,
    status:boolean
    id:number,
    avatar_updated:boolean
}


const OneHistory = (props:history) => {
     

    const router = useRouter();
    let myHistory;

    const fetchHistory = async (url:string) => {
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


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/history/me`,
    fetchHistory
    );



    if (data)
    {
        myHistory = data.map(history => {
            
            return  <div key={history.id} className={`stats-bgf p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105 flex items-center justify-between`}>
            <div className="">
                <p>Score:    {history.score}</p>
                <p>Rank:     {history.rank}</p>
            </div>

            <div className="">
                <p>{history.myresult > history.enemmyresult ? 'Victory' : 'Loss'} </p>
                <p>{history.myresult} vs {history.enemmyresult}</p>
            </div>


            <div className="">
                <Link href={`/user?username=${props.username}`}>
                <Avatar  size='md' name={props.username} src={props.image} >
            <AvatarBadge boxSize='1em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a'/>
            </Avatar>
                </Link>
                
             </div>
      
      </div> 
        });
    }

    return (

        <>
        {myHistory ? myHistory : "You Dont have any Match History"}
        </>


    //     <div className={`stats-bgf p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105 flex items-center justify-between`}>
    //         <div className="">
    //             <p>Score:    2036</p>
    //             <p>Rank:     +56</p>
    //         </div>

    //         <div className="">
    //             <p>Victory</p>
    //             <p>8 vs 6</p>
    //         </div>


    //         <div className="">
    //             <Link href={`/user?username=${props.username}`}>
    //             <Avatar  size='md' name={props.username} src={props.image} >
    //         <AvatarBadge boxSize='1em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a'/>
    //         </Avatar>
    //             </Link>
                
    //          </div>
      
    //   </div>        
    
    );
};
export default OneHistory;