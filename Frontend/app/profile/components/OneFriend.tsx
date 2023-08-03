import Link from "next/link";
import { Avatar, AvatarBadge} from '@chakra-ui/react'

interface props{
    image:string,
    username:string,
    status:boolean
    id:number,
    avatar_updated:boolean
}

const OneFriend = (props:props) => {
    let new_src_img;

    if (props.avatar_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.image;

    return (


            <Link href={`/user?username=${props.username}`}>
        <div className="friend">
        <div className="inside_friend">
           
    <Avatar size='md' name='Dan Abrahmov' src={props.avatar_updated ? new_src_img : props.image} >
    <AvatarBadge boxSize='1em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a'/>
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