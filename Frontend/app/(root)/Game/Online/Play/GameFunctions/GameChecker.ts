import p5 from 'p5';
import { GameData } from '../Game';
import { GameContextType } from '../../../GameContext/GameContext';
import { player1, player2 } from '../../Socket/start_game_socket';




export function GameStatusChecker(p5: p5,GameContext:GameContextType): boolean
{
  p5.textSize(GameData.GameWidth/26);
  if(GameContext.GameInfo.host)
  {
		player1.on('GameEnd',(data: string)=>
    {
      if(GameData.access && GameData.message === '')
      {
        GameData.message = data;
        player1.emit('conection_closed');
        console.log('conection_closed1');
      }
    
    });
    if(GameData.message !== '')
    {
      p5.background(0);
      p5.fill(255,255,255);
      p5.text(GameData.message, GameData.GameWidth/2 - GameData.GameWidth/12, GameData.GameHeight/2 + GameData.GameHeight/12);
      return false;
    }
  }
  else
  {
		player2.on('GameEnd',(data: string)=>
    {
      if(GameData.access && GameData.message === '')
      {  
        GameData.message = data;
        player2.emit('conection_closed');
        console.log('conection_closed2');
      }
    });
    if(GameData.message !== '')
    {
      p5.background(0);
      p5.fill(255,255,255);
      p5.text(GameData.message, GameData.GameWidth/2 - GameData.GameWidth/12, GameData.GameHeight/2 + GameData.GameHeight/12);
      return false;
    }

  }
  return true;
}