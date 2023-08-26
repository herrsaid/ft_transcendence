import { stream } from '@/app/(root)/Stream/Socket/start_stream_socket';
import { ConvertServerData } from './ConvertData';
import { StreamData } from '../Stream';

export function GetPlayersData(router:any)
{
  stream.on('send_players_data',(data)=>
  {
    StreamData.Racket1Ypos = ConvertServerData(data.Racket1Ypos,0);
    StreamData.Racket2Ypos = ConvertServerData(data.Racket2Ypos,0);
    StreamData.BallXpos = ConvertServerData(data.BallXpos,1);
    StreamData.BallYpos = ConvertServerData(data.BallYpos,0);
    StreamData.Result1Val = data.Result1Val;
    StreamData.Result2Val = data.Result2Val;
    if(data.Player1UserName)
      StreamData.Player1UserName = data.Player1UserName;
    else
      StreamData.Player1UserName = "player I";
    if(data.Player2UserName)
      StreamData.Player2UserName = data.Player2UserName;
    else
      StreamData.Player2UserName = "player II";
    if(data.Player1Image)
      StreamData.Player1Image = data.Player1Image;
    else
      StreamData.Player1Image = "/2.jpg";
    if(data.Player2Image)
      StreamData.Player2Image = data.Player2Image;
    else
      StreamData.Player2Image = "/3.jpg";
  });
  stream.on('SimulationEnd',()=>
  {
    router.replace('/Stream');
  });
}