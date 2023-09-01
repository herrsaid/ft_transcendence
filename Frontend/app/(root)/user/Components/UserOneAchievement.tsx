import { Avatar } from "@chakra-ui/react";

interface Achievevement{
    name:string,
}


const UserOneAchievement = (props:Achievevement) => {
    return (
       
        <div className={`stats-bgf p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105 flex items-center justify-between`}>
        <Avatar size='md' name='Dan Abrahmov' src="https://cdn.intra.42.fr/achievement/image/6/PRO002.svg" >
            
            </Avatar>
        <p className="text-purple-400">{props.name}</p>
        
        </div>
    );
};
export default UserOneAchievement;