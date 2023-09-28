import { newGameInfo } from "../Components/SettingsComponent";

export function GetSpeed(param :number)
{
    const element = document.getElementById("scroll");
    if(element != null)
    {
        if(param === 4)
            element.style.left = "-60%";
        else if(param === 6)
            element.style.left = "-12.5%";
        else
            element.style.left = "35%";
        newGameInfo.Speed=param;
    }
}