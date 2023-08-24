'use client'

import { GetPoints } from "../SettingsFuntions/Points";

const Points = ({ router }: any) => 
{
    return(
        <div className="relative flex h-[30px] top-[100px] md:top-[150px] lg:top-[175px]">
            <p className="relative flex left-[10%] bottom-[5px] text-xl md:text-2xl lg:text-3xl font-semibold text-white-500">
                Points :
            </p>
            <div className="relative flex my-auto bottom-[5px]  mx-auto h-[2px] w-[200px] md:w-[250px] lg:w-[300px]">
                <button  onClick={()=> GetPoints(1)} id="points1" className="relative flex w-[40px] h-[30px] left-[0%] md:left-[0%] lg:left-[0%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-500">
                    <p className="mx-auto my-auto">
                        10
                    </p>
                </button>
                <button onClick={()=> GetPoints(2)} id="points2" className="relative flex w-[40px] h-[30px] left-[20%] md:left-[25%] lg:left-[27.5%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                    <p className="mx-auto my-auto">
                        20
                    </p>
                </button>
                <button onClick={()=> GetPoints(3)} id="points3" className="relative flex w-[40px] h-[30px] left-[40%] md:left-[52.5%] lg:left-[60%] bottom-[12.5px] text-white-500 rounded-lg shadow-2xl bg-indigo-700">
                    <p className="mx-auto my-auto">
                        30
                    </p>
                </button>
            </div>
        </div>
    );
}
export default Points;
