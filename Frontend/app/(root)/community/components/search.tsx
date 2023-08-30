import { useState } from "react";
import Group from "./group";


export default function Search(props:any)
{
    console.log(props.search)
    if (!props.search)
        return(<>no groups</>)
    return (
        <div className="flex flex-col">
            {
            (props.search != undefined)?(
                props.search.map((data:any,index:number) => {return(<Group key={index} name={data.name} id={data.id}/>)})
            ):<>no groups</>
            }
        </div>
    )
}