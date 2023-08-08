"use client"
import "../../(root)/profile/profile.css"
import { Avatar, AvatarBadge} from "@chakra-ui/react";

interface props{
    img:string,
    username:string,
    id:number,
    avatar_updated:boolean,
    status:boolean
}



const ProfileAvatar = (props:props) => {

    let new_src_img;
    

    if (props.avatar_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
    return (


        <div className="avatar_edit_real border-2 border-blue-500/100 rounded-full">

                <Avatar size='xl' name='Segun Adebayo' src={props.avatar_updated ? new_src_img : props.img}>
                        <AvatarBadge boxSize='0.8em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a' />
                        </Avatar>
                </div>
                
    );


    
};
export default ProfileAvatar;