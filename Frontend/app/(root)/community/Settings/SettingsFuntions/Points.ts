import { newGameInfo } from "../Components/SettingsComponent";

export function GetPoints(param: number)
{
    for(let a=1;a<4;a++)
    {
        const mapv = document.getElementById(`points${a}`);
        if(mapv !== null)
            mapv.style.backgroundColor = " rgb(67,56,202)";
    }
    const changemap= document.getElementById(`points${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
    newGameInfo.Points = param*10;
}