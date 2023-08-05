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


//         <div className="stats-bgf rounded-lg shadow-lg p-4">
//     <h2 className="text-xl font-semibold mb-4 text-white">Friends</h2>
//     <ul>
      
      
      

//       <li className="flex items-center justify-between mb-2">
//         <div className="flex items-center">
//           <img src="avatar.png" alt="Friend Avatar" className="friend-avatar rounded-full mr-3"/>
//           <div>
//             <p className="font-semibold text-blue-500">selhanda</p>
//             <p className="text-sm text-gray-500">Playing Ping Pong</p>
//           </div>
//         </div>
//         <div className="text-xs text-green-500 font-semibold">Online</div>
//       </li>



//       <li className="flex items-center justify-between mb-2">
//         <div className="flex items-center">
//           <img src="avatar.png" alt="Friend Avatar" className="friend-avatar rounded-full mr-3"/>
//           <div>
//             <p className="font-semibold text-blue-500">selhanda</p>
//             <p className="text-sm text-gray-500">Playing Ping Pong</p>
//           </div>
//         </div>
//         <div className="text-xs text-green-500 font-semibold">Online</div>
//       </li>


//     </ul>
//   </div>













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