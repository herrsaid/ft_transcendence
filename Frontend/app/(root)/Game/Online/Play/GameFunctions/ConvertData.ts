import { GameDataContextType } from "../GameClass/GameClass";


export function ConvertServerData(ServerData:number,Mood:number,GDC:GameDataContextType)
{
  if(Mood)
    return(Math.floor(((ServerData* 100)/800)* (GDC.GameData.GameWidth/100)));
  return(Math.floor(((ServerData* 100)/400)* (GDC.GameData.GameHeight/100)));
}

export function ConvertClientData(ClientData:number,Mood:number,GDC:GameDataContextType)
{
  if(Mood)
    return(Math.floor(((ClientData* 100)/GDC.GameData.GameWidth)* (800/100)));
  return(Math.floor(((ClientData* 100)/GDC.GameData.GameHeight)* (400/100)));
}
