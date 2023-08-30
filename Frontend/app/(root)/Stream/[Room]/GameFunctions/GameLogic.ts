import { stream } from '@/app/(root)/Stream/Socket/start_stream_socket';
import { ConvertServerData } from './ConvertData';
import { StreamData } from '../Stream';
import { StreamContextType, StreamInfoType } from '../../StreamContext/StreamContext';

export function GetPlayersData(router:any,SC:StreamContextType )
{
  stream.on('send_players_data',(data)=>
  {
    let StreamObj:StreamInfoType = new StreamInfoType();
    StreamData.Racket1Ypos = ConvertServerData(data.Racket1Ypos,0);
    StreamData.Racket2Ypos = ConvertServerData(data.Racket2Ypos,0);
    StreamData.BallXpos = ConvertServerData(data.BallXpos,1);
    StreamData.BallYpos = ConvertServerData(data.BallYpos,0);
    StreamData.Result1Val = data.Result1Val;
    StreamData.Result2Val = data.Result2Val;
    StreamObj.Access = SC.StreamInfo.Access;
    StreamObj.RoomNumber = SC.StreamInfo.RoomNumber;
    if(data.Player1UserName)
      StreamObj.Player1UserName = data.Player1UserName;
    if(data.Player2UserName)
      StreamObj.Player2UserName = data.Player2UserName;
    if(data.Player1Image)
      StreamObj.Player1Image = data.Player1Image;
    if(data.Player2Image)
      StreamObj.Player2Image = data.Player2Image;
      SC.SetStreamInfo(StreamObj);
  });
  stream.on('SimulationEnd',()=>
  {
    router.replace('/Stream');
  });
}