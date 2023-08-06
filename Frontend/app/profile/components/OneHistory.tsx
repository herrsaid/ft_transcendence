import { Avatar, AvatarBadge} from "@chakra-ui/react";
import Link from "next/link";

interface history{
    image:string,
    username:string,
    status:boolean
    id:number,
    avatar_updated:boolean
}


const OneHistory = (props:history) => {
     

   
    return (



        <div className={`stats-bgf p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105 flex items-center justify-between`}>
            <div className="">
                <p>Score:    2036</p>
                <p>Rank:     +56</p>
            </div>

            <div className="">
                <p>Victory</p>
                <p>8 vs 6</p>
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