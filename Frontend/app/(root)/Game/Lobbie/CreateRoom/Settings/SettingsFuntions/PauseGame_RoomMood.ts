import { InGame } from '@/app/(root)/Components/Notification/Notification';
import { newGameInfo } from '../Settings';

export function GetPauseGame_RoomMood(param: number)
{
    try
    {
        let main= document.getElementById("other_tools");
        let p= document.getElementById("other_tools_p");
        let p0= document.getElementById("other_tools_0");
        let p1= document.getElementById("other_tools_1");
        let invt= document.getElementById("invite");
        for(let a=0;a<2;a++)
        {
            const pause_game_ = document.getElementById(`pause_game_${a}`);
            if(pause_game_ !== null)
                pause_game_.style.backgroundColor = " rgb(67,56,202)";
        }
        const changemap = document.getElementById(`pause_game_${param}`);
        if(changemap !== null)
            changemap.style.backgroundColor = " rgb(99 102 241)";
        newGameInfo.pause_game = param;
        InGame.RM = !!param;
        if(param)
        {
            if(newGameInfo.Online)
            {
                newGameInfo.RoomMood=1;
                if(main && p && p0 && p1 && invt)
                {
                    main.style.opacity = "0";
                    invt.style.opacity = "0";
                    main.style.display = "none";
                    invt.style.display = "none";
                }
            }
        }
        else
        {
            if(newGameInfo.Online)
            {
                newGameInfo.RoomMood=0;
                if(main && p && p0 && p1 && invt)
                {
                    p.innerHTML = "Invite :";
                    main.style.opacity = "1";
                    invt.style.opacity = "1";
                    main.style.display = "flex";
                    invt.style.display = "flex"
                    p0.style.opacity = "0";
                    p1.style.opacity = "0";
                    p0.style.display = "none";
                    p1.style.display = "none";
                }
            }
        }
    }
    catch{}
}