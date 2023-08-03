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
        <div>
             <div className="victory_div">
            <div className="info_victory">
                <p>Score:    2036</p>
                <p>Rank:     +56</p>
            </div>
        
            <div className="result_victory">
                <p>Victory</p>
                <p>8 vs 6</p>
            </div>
        
            <div className="game_victory"><div className="game_victory" >
                <Link href={`/user?username=${props.username}`}>
                <Avatar  size='md' name={props.username} src={props.image} >
            <AvatarBadge boxSize='1em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a'/>
            </Avatar>
                </Link>
                
             </div>
             </div>
</div>
        </div>
        
    
    );
};
export default OneHistory;