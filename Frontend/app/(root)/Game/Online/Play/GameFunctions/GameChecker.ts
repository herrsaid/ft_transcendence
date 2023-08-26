import p5 from 'p5';
import { GameContextType } from '../../../GameContext/GameContext';
import { player1, player2 } from '../../Socket/start_game_socket';
import { GameDataContextType } from '../GameClass/GameClass';
import { InGame } from '@/app/(root)/layout';




export function GameStatusChecker(p5: p5,GameContext:GameContextType,GDC:GameDataContextType): boolean
{
  p5.textSize(GDC.GameData.GameWidth/26);
  if(GameContext.GameInfo.host)
  {
		player1.on('GameEnd',(data: string)=>
    {
      if(GDC.GameData.access && GDC.GameData.message === '')
      {
        GDC.GameData.message = data;
        player1.emit('conection_closed');
        console.log('conection_closed1');
      }
    
    });
    if(GDC.GameData.message !== '')
    {
      p5.background("#090533");
      p5.fill(255,255,255);
      p5.text(GDC.GameData.message, GDC.GameData.GameWidth/2 - GDC.GameData.GameWidth/12, GDC.GameData.GameHeight/2 + GDC.GameData.GameHeight/12);
      InGame.IG = false;
      return false;
    }
  }
  else
  {
		player2.on('GameEnd',(data: string)=>
    {
      if(GDC.GameData.access && GDC.GameData.message === '')
      {  
        GDC.GameData.message = data;
        player2.emit('conection_closed');
        console.log('conection_closed2');
      }
    });
    if(GDC.GameData.message !== '')
    {
      p5.background("#090533");
      p5.fill(255,255,255);
      p5.text(GDC.GameData.message, GDC.GameData.GameWidth/2 - GDC.GameData.GameWidth/12, GDC.GameData.GameHeight/2 + GDC.GameData.GameHeight/12);
      InGame.IG = false;
      return false;
    }

  }
  return true;
}