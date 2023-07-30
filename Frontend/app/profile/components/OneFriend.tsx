import Link from "next/link";
import { Avatar, AvatarBadge} from '@chakra-ui/react'

interface props{
    image:string,
    username:string,
    status:boolean
    id:number
}

const OneFriend = (props:props) => {
    return (


            <Link href={`/user?username=${props.username}`}>
        <div className="friend">
        <div className="inside_friend">
           
    <Avatar size='md' name='Dan Abrahmov' src={props.image} >
    <AvatarBadge boxSize='1em' bg='green.500' borderColor='#18184a'/>
    </Avatar>

        </div>

        <p className="enligne">
        {props.username}
        </p>
        
    </div>
    </Link>
    );
};
export default OneFriend;