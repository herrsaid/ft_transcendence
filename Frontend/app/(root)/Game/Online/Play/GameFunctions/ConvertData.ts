import { GameData } from "../Game";

export function ConvertServerData(ServerData:number,Mood:number)
{
  if(Mood)
    return(Math.floor(((ServerData* 100)/800)* (GameData.GameWidth/100)));
  return(Math.floor(((ServerData* 100)/400)* (GameData.GameHeight/100)));
}

export function ConvertClientData(ClientData:number,Mood:number)
{
  if(Mood)
    return(Math.floor(((ClientData* 100)/GameData.GameWidth)* (800/100)));
  return(Math.floor(((ClientData* 100)/GameData.GameHeight)* (400/100)));
}
