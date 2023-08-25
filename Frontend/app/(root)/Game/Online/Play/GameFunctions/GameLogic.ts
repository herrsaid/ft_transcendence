import p5 from 'p5';
import { GameContextType } from '../../../GameContext/GameContext';
import { player1, player2 } from '../../../Online/Socket/start_game_socket';
import { ConvertClientData, ConvertServerData } from './ConvertData';
import { GameDataContextType } from '../GameClass/GameClass';
import { InGame } from '@/app/(root)/layout';

export function BallAnimation (GameContext:GameContextType,GDC:GameDataContextType)
{
  if(GameContext.GameInfo.host)
  {  
    player1.on('BallPos',(GameInfo)=>
    {
      if(GDC.GameData.access)
      {
        GDC.GameData.BallXpos = GDC.GameData.GameWidth - ConvertServerData(GameInfo.BallXpos,1,GDC);
        GDC.GameData.BallYpos = GDC.GameData.GameHeight -  ConvertServerData(GameInfo.BallYpos,0,GDC);
        GDC.GameData.Result1Val = GameInfo.Result2Val;
        GDC.GameData.Result2Val = GameInfo.Result1Val;
      }
    });
  }
  else
  {
    player2.on('BallPos',(GameInfo)=>
    {
      if(GDC.GameData.access)
      {
        GDC.GameData.BallXpos = ConvertServerData(GameInfo.BallXpos,1,GDC);
        GDC.GameData.BallYpos = ConvertServerData(GameInfo.BallYpos,0,GDC);
        GDC.GameData.Result1Val = GameInfo.Result1Val;
        GDC.GameData.Result2Val = GameInfo.Result2Val;
      }
    });
  }
}
export function Racket1Animation(p5: p5,GDC:GameDataContextType)
{
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (GDC.GameData.Racket1Ypos > 0))
    GDC.GameData.Racket1Ypos -= GDC.GameData.GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (GDC.GameData.Racket1Ypos < (GDC.GameData.GameHeight - GDC.GameData.Racket1Height)))
    GDC.GameData.Racket1Ypos += GDC.GameData.GameSpeed;
  else if(p5.mouseY > 0 && p5.mouseY < GDC.GameData.GameHeight && p5.mouseX > 0 && p5.mouseX < GDC.GameData.GameHeight)
  {
    if(p5.mouseY< GDC.GameData.Racket1Ypos)
    GDC.GameData.Racket1Ypos -= GDC.GameData.GameSpeed;
    else if(p5.mouseY > (GDC.GameData.Racket1Ypos + GDC.GameData.Racket1Height))
      GDC.GameData.Racket1Ypos += GDC.GameData.GameSpeed;
  }
  player1.emit('send_player1_data',ConvertClientData(((GDC.GameData.GameHeight - GDC.GameData.Racket1Height) - GDC.GameData.Racket1Ypos),0,GDC));
	player1.on('send_player1_data',(data)=> 
  {
    if(GDC.GameData.access)
      GDC.GameData.Racket2Ypos =  (GDC.GameData.GameHeight - GDC.GameData.Racket2Height) - ConvertServerData(data,0,GDC);
  });
}

export function Racket2Animation(p5: p5,GDC:GameDataContextType)
{
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (GDC.GameData.Racket1Ypos > 0))
    GDC.GameData.Racket1Ypos -= GDC.GameData.GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (GDC.GameData.Racket1Ypos < (GDC.GameData.GameHeight - GDC.GameData.Racket1Height)))
    GDC.GameData.Racket1Ypos += GDC.GameData.GameSpeed;
  else if(p5.mouseY > 0 && p5.mouseY < GDC.GameData.GameHeight && p5.mouseX > 0 && p5.mouseX < GDC.GameData.GameHeight)
  {
    if(p5.mouseY< GDC.GameData.Racket1Ypos)
      GDC.GameData.Racket1Ypos -= GDC.GameData.GameSpeed;
    else if(p5.mouseY > (GDC.GameData.Racket1Ypos + GDC.GameData.Racket1Height))
      GDC.GameData.Racket1Ypos += GDC.GameData.GameSpeed;
  }
  player2.emit('send_player2_data', ConvertClientData(GDC.GameData.Racket1Ypos,0,GDC));
	player2.on('send_player2_data',(data)=> 
  {
    if(GDC.GameData.access)
      GDC.GameData.Racket2Ypos =  ConvertServerData(data,0,GDC);
  });
}
export function first_conection(p5:p5,GameContext:GameContextType,GDC:GameDataContextType)
{
  if(!GameContext.GameInfo.Access)
  {
    if(document.getElementById('sketch-container') && typeof window !== "undefined")
    p5.createCanvas(GDC.GameData.GameWidth, GDC.GameData.GameHeight).parent('sketch-container').position((window.innerWidth-GDC.GameData.GameWidth)/2,GDC.GameData.GameHeight/4,'absolute');
  p5.background(0);
  p5.fill(255,255,255);
    p5.text("please sign-in before playing", GDC.GameData.GameWidth/2 - GDC.GameData.GameWidth/4, GDC.GameData.GameHeight/2 + GDC.GameData.GameHeight/24);
    return false;
  }
  else if(GDC.GameData.first_conection_val === false)
	{
    InGame.IG = true;
    GDC.GameData.first_conection_val = true;
    if(GameContext.GameInfo.host)
    {
        player1.emit('first_conection',
        {
          Speed: GameContext.GameInfo.Speed,
          Points:GameContext.GameInfo.Points,
          myusername:GameContext.GameInfo.myusername,
          myimage:GameContext.GameInfo.myimage,
        });
      }
      else
		  {
        player2.emit('first_conection',
        {
          Speed: GameContext.GameInfo.Speed,
          Points:GameContext.GameInfo.Points,
          myusername:GameContext.GameInfo.myusername,
          myimage:GameContext.GameInfo.myimage,
        });
      }
    }
  return true;
}
