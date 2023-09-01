import { newGameInfo } from "../Components/SettingsComponent";

export function GetMatchMood(param: number)
{
    const changemap= document.getElementById(`match_mood_${param}`);
    const play = document.getElementById('play');
    const play2 = document.getElementById('play2');
    const other_tools = document.getElementById('other_tools');
    const main= document.getElementById("other_tools");
    const p= document.getElementById("other_tools_p");
    const p0= document.getElementById("other_tools_0");
    const p1= document.getElementById("other_tools_1");
    const invt= document.getElementById("invite");
    const pause_game_p = document.getElementById('pause_game_p');
    const pause_game_0_p = document.getElementById('pause_game_0_p');
    const pause_game_1_p = document.getElementById('pause_game_1_p');
    for(let a=0;a<2;a++)
    {
        const match_mood_ = document.getElementById(`match_mood_${a}`);
        if(match_mood_ !== null)
            match_mood_.style.backgroundColor = " rgb(67,56,202)";
    }
    if(changemap !== null)
        changemap.style.backgroundColor = " rgb(99 102 241)";
    if(param === 1)
    {
        
        if(play !== null)
            play.style.zIndex = "1";
        if(play2 !== null)
            play2.style.zIndex = "2";
        if(main && p && p0 && p1 && invt)
        {
            p.innerHTML = "Invite :";
            if(!newGameInfo.RoomMood)
            {
                main.style.display = "1";
                invt.style.opacity = "1";
                main.style.display = "flex";
                invt.style.display = "flex";
            }
            else
            {
                main.style.opacity = "0";
                invt.style.opacity = "0";
                main.style.display = "none";
                invt.style.display = "none";
            }
            p0.style.opacity = "0";
            p1.style.opacity = "0";
            p0.style.display = "none";
            p1.style.display = "none";
        }
            if(pause_game_p !== null
            && pause_game_0_p !== null
            && pause_game_1_p !== null)
        {
            pause_game_p.innerHTML = "Room &nbsp;Mood :";
            pause_game_1_p.innerHTML = "Public";
            pause_game_0_p.innerHTML = "Private";
        }
    }
    else
    {
        if(play !== null)
            play.style.zIndex = "2";
        if(play2 !== null)
            play2.style.zIndex = "1";
            if(main && p && p0 && p1 && invt)
            {
                p.innerHTML = "Other &nbsp;Tools :";
                main.style.opacity = "1";
                invt.style.opacity = "0";
                main.style.display = "flex";
                invt.style.display = "none";
                p0.style.opacity = "1";
                p1.style.opacity = "1";
                p0.style.display = "flex";
                p1.style.display = "flex";
            }
            if(pause_game_p !== null
            && pause_game_0_p !== null
            && pause_game_1_p !== null)
        {
            pause_game_p.innerHTML = "Pause Game :";
            pause_game_1_p.innerHTML = "Yes";
            pause_game_0_p.innerHTML = "No";
        }
    }
    newGameInfo.Online = param;
}