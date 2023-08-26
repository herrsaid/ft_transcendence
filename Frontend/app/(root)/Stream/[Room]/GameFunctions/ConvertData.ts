import { StreamData } from '../Stream';


export function ConvertServerData(ServerData:number,Mood:number)
{
  if(Mood)
    return(Math.floor(((ServerData* 100)/800)* (StreamData.GameWidth/100)));
  return(Math.floor(((ServerData* 100)/400)* (StreamData.GameHeight/100)));
}