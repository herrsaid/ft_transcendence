import { newGameInfo } from '../Settings';

export function GetSpeed(param :number)
{
    const element = document.getElementById("scroll");
    if(element != null)
    {
        if(param === 1)
        element.style.left = "-60%";
        else if(param === 2)
        element.style.left = "-12.5%";
        else
        element.style.left = "35%";
        newGameInfo.Speed=param;
    }
}