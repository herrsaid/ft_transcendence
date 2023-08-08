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
    score:number,
    rank:number,
    myresult:number,
    enemmyresult:number

}


const OneHistory = (props:history) => {
     


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
                <Link href={`/user?username=${props.username}`}>
                <Avatar  size='md' name={props.username} src={props.image} >
            <AvatarBadge boxSize='1em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a'/>
            </Avatar>
                </Link>
                
             </div>
      
      </div>        
    
    );
};
export default OneHistory;