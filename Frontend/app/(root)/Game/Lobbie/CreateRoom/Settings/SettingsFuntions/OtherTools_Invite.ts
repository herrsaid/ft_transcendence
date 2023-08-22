import { newGameInfo } from '../Settings';

export function GetOtherTools_Invite(param: number)
{
    for(let a=0;a<2;a++)
    {
        const other_tools_ = document.getElementById(`other_tools_${a}`)
        if(other_tools_ !== null)
            other_tools_.style.backgroundColor = " rgb(67,56,202)";
    }
    const changemap= document.getElementById(`other_tools_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
    newGameInfo.other_tools = param;
}