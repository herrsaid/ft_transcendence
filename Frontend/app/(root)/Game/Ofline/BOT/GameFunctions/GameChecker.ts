import p5 from 'p5';
import { GameData } from '../Game';
import { GameContextType } from '../../../GameContext/GameContext';




export function GameStatusChecker(p5: p5,GameContext:GameContextType): boolean
{
  if(GameContext.GameInfo.Points <= GameData.Result1Val)
  {
    p5.background("#090533");
    p5.fill(255,255,255);
    p5.text(`${GameContext.GameInfo.myusername} WIN`, GameData.GameWidth/2 - GameData.GameWidth/12, GameData.GameHeight/2 + GameData.GameHeight/12);
    return false;
  }
  else if(GameContext.GameInfo.Points <= GameData.Result2Val)
  {
    p5.background("#090533");
    p5.fill(255,255,255);
    p5.text('BOT WIN', GameData.GameWidth/2 - GameData.GameWidth/12, GameData.GameHeight/2 + GameData.GameHeight/12);
    return false;
  }
  return GameData.access;
}