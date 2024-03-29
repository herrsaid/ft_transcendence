import p5 from 'p5';
import { GameData } from '../Component/Game';
import { GameContextType } from '../../../GameContext/GameContext';


export function GetAlpha(p5: p5,BallYpos: number, RacketYpos: number, RacketHeight: number)
{
  try
  {
    let ballYpos_racket: number;
    if(BallYpos > RacketYpos || BallYpos < (RacketYpos + RacketHeight))
      ballYpos_racket = BallYpos - RacketYpos;
    else
      ballYpos_racket = 0;
    let ballYpos_racket_par_100: number = p5.int(ballYpos_racket/(p5.int(RacketHeight/10)));
    GameData.alpha = ballYpos_racket_par_100 - (10 - ballYpos_racket_par_100);
    GameData.alpha = Math.floor(GameData.alpha);
    if(GameData.alpha === -10|| GameData.alpha === 10)
      GameData.alpha = 9;
    if(GameData.alpha > 0)
      GameData.alpha -= 10;
    else if(GameData.alpha < 0)
      GameData.alpha += 10;
    if(ballYpos_racket_par_100 > 5)
      GameData.BallYDirection = 1;
    else
      GameData.BallYDirection = -1;
    if(GameData.alpha < 0)
      GameData.alpha *= -1;
  }
  catch{}
}
export function BallAnimation(p5: p5)
{
  try
  {
    GameData.BallXpos += Math.floor(GameData.BallXDirection);
    if(GameData.BallYpos < GameData.Racket2Ypos || GameData.BallYpos > (GameData.Racket2Ypos + GameData.Racket2Height))
    {
      if(GameData.BallXpos > GameData.GameWidth)
      {
        GameData.BallXDirection = -1;
        GameData.Result1Val++;
        GameData.BallXpos = Math.floor(GameData.GameWidth/2);
      }
    }
    else
    {
      if(GameData.BallXpos > (GameData.GameWidth-(GameData.BallWidth+GameData.Racket1Width)))
      {
        GameData.BallXDirection = -1;
        GetAlpha(p5,GameData.BallYpos,GameData.Racket2Ypos,GameData.Racket2Height);
      }
    }
    if(GameData.BallYpos < GameData.Racket1Ypos || GameData.BallYpos > (GameData.Racket1Ypos + GameData.Racket1Height))
    {
      if(GameData.BallXpos < 0)
      {
        GameData.BallXDirection = +1;
        GameData.Result2Val++;
        GameData.BallXpos =  Math.floor(GameData.GameWidth/2);
      }
    }
    else
    {
      if(GameData.BallXpos < (GameData.BallWidth + GameData.Racket2Width))
      {
        GameData.BallXDirection = +1;
        GetAlpha(p5,GameData.BallYpos,GameData.Racket1Ypos,GameData.Racket1Height);
      }
    }
    if(GameData.BallXpos % GameData.alpha === 0)
    {
      if(GameData.BallYpos > GameData.GameHeight-GameData.BallHeight/2)
        GameData.BallYDirection = -1
      if(GameData.BallYpos < GameData.BallHeight/2)
        GameData.BallYDirection = +1
      GameData.BallYpos += GameData.BallYDirection;
    }
  }
  catch{}
}

export function Racket1Animation(p5: p5,GameContext:GameContextType)
{
  try
  {
    if((p5.key == 'w' || p5.key == 'ArrowUp') && (GameData.Racket1Ypos > 0))
      GameData.Racket1Ypos -= GameContext.GameInfo.Speed;
    else if ((p5.key == 's' || p5.key == 'ArrowDown') && (GameData.Racket1Ypos < (GameData.GameHeight - GameData.Racket1Height)))
      GameData.Racket1Ypos += GameContext.GameInfo.Speed;
    else if(p5.mouseY > 0 && p5.mouseY < GameData.GameHeight && p5.mouseX > 0 && p5.mouseX < GameData.GameHeight)
    {
      if(p5.mouseY< GameData.Racket1Ypos && (GameData.Racket1Ypos > 0))
        GameData.Racket1Ypos -= GameContext.GameInfo.Speed;
      else if(p5.mouseY > GameData.Racket1Ypos && (GameData.Racket1Ypos < (GameData.GameHeight - GameData.Racket1Height)))
        GameData.Racket1Ypos += GameContext.GameInfo.Speed;
    }
  }
  catch{}
}
export function Racket2Animation(p5: p5,GameContext:GameContextType)
{
  try
  {
    let rand = p5.random(100);
    // if(rand > 95)
    //   await setTimeout(()=>{},10000);
    if(GameData.BallXDirection > 0 && GameData.BallXpos > (GameData.GameWidth/2 + GameData.GameWidth/4))
    {
      if(GameData.BallYpos < GameData.Racket2Ypos && (GameData.Racket2Ypos > 0))
      GameData.Racket2Ypos -= GameContext.GameInfo.Speed;
      else if (GameData.BallYpos > (GameData.Racket2Ypos+GameData.Racket2Height)   && (GameData.Racket2Ypos < (GameData.GameHeight - GameData.Racket2Height)))
      GameData.Racket2Ypos += GameContext.GameInfo.Speed;
    }
  }
  catch{}
}