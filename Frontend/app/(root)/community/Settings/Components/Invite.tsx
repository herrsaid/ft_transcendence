'use client'


import { GameContextType } from '@/app/(root)/Game/GameContext/GameContext';
import { StartRoom } from '../SettingsFuntions/StartRoom';

const Invite = (props:{router:any,toast:any,GameContext:GameContextType}) => 
{
    return(
        <button onClick={() => {StartRoom(props.router,props.toast,props.GameContext)}} id="play" className="relative top-[200px] md:top-[250px] lg:top-[250px] h-[40px] md:h-[50px] lg:h-[60px] w-[80px] md:w-[100px] lg:w-[120px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-2xl shadow-blue-500 hover:shadow-blue-600 ">
            <p>
                Invite
            </p>
        </button>
    );
}
export default Invite;
