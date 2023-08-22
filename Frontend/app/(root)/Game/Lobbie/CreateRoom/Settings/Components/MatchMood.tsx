import { GetMatchMood } from "../SettingsFuntions/MatchMood";

const MatchMood = ({ router }: any) => 
{
    return(
        <div className="relative flex h-[30px] top-[150px] md:top-[200px] lg:top-[250px]">
            <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                Match Mood :
            </p>
            <button onClick={()=> GetMatchMood(0)} id="match_mood_0" className="relative flex w-[60px] h-[30px] left-[15%] top-[0px] md:left-[20%] lg:left-[20%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                <p  className="mx-auto my-auto">
                    Ofline
                </p>
            </button>
            <button onClick={()=> GetMatchMood(1)} id="match_mood_1" className="relative flex w-[60px] h-[30px] left-[22.5%] top-[0px] md:left-[30%] lg:left-[33%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                <p  className="mx-auto my-auto">
                    Online
                </p>
            </button>
        </div>
    );
}
export default MatchMood;
