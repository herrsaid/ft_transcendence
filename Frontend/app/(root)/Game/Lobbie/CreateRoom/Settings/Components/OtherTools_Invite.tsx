import { GetPauseGame_RoomMood } from "../SettingsFuntions/PauseGame_RoomMood";


const OtherTools_Invite = ({ router }: any) => 
{
    return(
        <div id="pause_game" className="relative flex h-[30px] top-[200px] md:top-[250px] lg:top-[325px]">
            <p id="pause_game_p" className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                Room  &nbsp;Mood :
            </p>
            <button onClick={()=> GetPauseGame_RoomMood(0)} id="pause_game_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                <p id="pause_game_0_p" className="mx-auto my-auto">
                    private
                </p>
            </button>
            <button onClick={()=> GetPauseGame_RoomMood(1)} id="pause_game_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                <p id="pause_game_1_p" className="mx-auto my-auto">
                    Public
                </p>
            </button>
        </div>
    );
}
export default OtherTools_Invite;
