import { Avatar, AvatarBadge} from "@chakra-ui/react";

interface props{
    img:string,
    username:string,
    id:number,
    status:boolean
}



const ProfileAvatar = (props:props) => {

    let new_src_img;
    
    return (


        <div className="avatar_edit_real border-2 border-purple-500/100 rounded-full">

                <Avatar size='xl' name='Segun Adebayo' src={props.img}>
                        <AvatarBadge boxSize='0.8em' bg={props.status ? 'green.500' : 'tomato'} borderColor='#18184a' />
                        </Avatar>
                </div>
                
    );


    
};
export default ProfileAvatar;