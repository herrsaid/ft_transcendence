'use client'


import { GetSpeed } from '../SettingsFuntions/Speed';


const Speed = () => 
{
    return(
        <div id="speed" className="relative flex h-[30px] top-[50px] md:top-[100px] lg:top-[100px]">
            <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                Speed :
            </p>
            <div className="relative flex my-auto  mx-auto h-[2px] w-[200px] md:w-[250px] lg:w-[300px] bg-indigo-500">
            <button  onClick={()=>  GetSpeed(1)} id="p_1" className="relative flex left-[0%] md:left-[0%] lg:left-[0%] bottom-[25px] text-white-500">x1</button>
            <button  onClick={()=>  GetSpeed(2)} id="p_2" className="relative flex left-[38.5%] md:left-[38.5%] lg:left-[38.5%] bottom-[25px] text-white-500">x2</button>
            <button  onClick={()=>  GetSpeed(4)} id="p_4" className="relative flex left-[75%] md:left-[80%] lg:left-[82.5%] bottom-[25px] text-white-500 ">x4</button>
                <div id="scroll" className="relative flex mx-auto w-[25px] h-[10px] bg-indigo-500 bottom-[4px] rounded-lg shadow-2xl left-[32%] md:left-[35%] lg:left-[38%]"></div>
            </div>
        </div>
    );
}
export default Speed;
