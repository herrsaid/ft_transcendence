'use client'

import { GetOtherTools_Invite } from "../SettingsFuntions/OtherTools_Invite";

const PauseGame_RoomMood = ({ router }: any) => 
{
    return(
        <div id="other_tools"  className="relative flex h-[30px] top-[250px] md:top-[300px] lg:top-[400px] opacity-0">
            <p id="other_tools_p" className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                    Other &nbsp;Tools :
            </p>
            <button onClick={()=> GetOtherTools_Invite(0)} id="other_tools_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                <p className="mx-auto my-auto">
                    Bot
                </p>
            </button>
            <div  id="invite">
                <input id= "input_val" type='text' placeholder="invite user..." className=" absolute h-[30px] w-[150px] left-[45%] bg-indigo-500 rounded-md text-center ">
                </input>
            </div>
            <button onClick={()=> GetOtherTools_Invite(1)} id="other_tools_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                <p className="mx-auto my-auto">
                2P
                </p>
            </button>
        </div>
    );
}
export default PauseGame_RoomMood;
