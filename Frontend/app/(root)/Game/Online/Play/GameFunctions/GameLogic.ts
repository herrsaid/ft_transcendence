import p5 from 'p5';
import { GameData } from '../Game';
import { GameContextType } from '../../../GameContext/GameContext';
import { player1, player2 } from '../../../Online/Socket/start_game_socket';
import { ConvertClientData, ConvertServerData } from './ConvertData';

export function BallAnimation (GameContext:GameContextType)
{
  if(GameContext.GameInfo.host)
  {  
    player1.on('BallPos',(GameInfo)=>
    {
      if(GameData.access)
      {
        GameData.BallXpos = GameData.GameWidth - ConvertServerData(GameInfo.BallXpos,1);
        GameData.BallYpos = GameData.GameHeight -  ConvertServerData(GameInfo.BallYpos,0);
        GameData.Result1Val = GameInfo.Result2Val;
        GameData.Result2Val = GameInfo.Result1Val;
      }
    });
  }
  else
  {
    player2.on('BallPos',(GameInfo)=>
    {
      if(GameData.access)
      {
        GameData.BallXpos = ConvertServerData(GameInfo.BallXpos,1);
        GameData.BallYpos = ConvertServerData(GameInfo.BallYpos,0);
        GameData.Result1Val = GameInfo.Result1Val;
        GameData.Result2Val = GameInfo.Result2Val;
      }
    });
  }
}
export function Racket1Animation(p5: p5): undefined
{
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (GameData.Racket1Ypos > 0))
    GameData.Racket1Ypos -= GameData.GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (GameData.Racket1Ypos < (GameData.GameHeight - GameData.Racket1Height)))
    GameData.Racket1Ypos += GameData.GameSpeed;
  else if(p5.mouseY > 0 && p5.mouseY < GameData.GameHeight && p5.mouseX > 0 && p5.mouseX < GameData.GameHeight)
  {
    if(p5.mouseY< GameData.Racket1Ypos)
      GameData.Racket1Ypos -= GameData.GameSpeed;
    else if(p5.mouseY > (GameData.Racket1Ypos + GameData.Racket1Height))
      GameData.Racket1Ypos += GameData.GameSpeed;
  }
  player1.emit('send_player1_data',ConvertClientData(((GameData.GameHeight - GameData.Racket1Height) - GameData.Racket1Ypos),0));
	player1.on('send_player1_data',(data)=> 
  {
    if(GameData.access)
      GameData.Racket2Ypos =  (GameData.GameHeight - GameData.Racket2Height) - ConvertServerData(data,0);
  });
}

export function Racket2Animation(p5: p5): undefined
{
  if((p5.key == 'w' || p5.key == 'ArrowUp') && (GameData.Racket1Ypos > 0))
    GameData.Racket1Ypos -= GameData.GameSpeed;
  else if ((p5.key == 's' || p5.key == 'ArrowDown') && (GameData.Racket1Ypos < (GameData.GameHeight - GameData.Racket1Height)))
    GameData.Racket1Ypos += GameData.GameSpeed;
  else if(p5.mouseY > 0 && p5.mouseY < GameData.GameHeight && p5.mouseX > 0 && p5.mouseX < GameData.GameHeight)
  {
    if(p5.mouseY< GameData.Racket1Ypos)
      GameData.Racket1Ypos -= GameData.GameSpeed;
    else if(p5.mouseY > (GameData.Racket1Ypos + GameData.Racket1Height))
      GameData.Racket1Ypos += GameData.GameSpeed;
  }
  player2.emit('send_player2_data', ConvertClientData(GameData.Racket1Ypos,0));
	player2.on('send_player2_data',(data)=> 
  {
    if(GameData.access)
      GameData.Racket2Ypos =  ConvertServerData(data,0);
  });
}
export function first_conection(p5:p5,GameContext:GameContextType)
{
  if(!GameContext.GameInfo.Access)
  {
    if(document.getElementById('sketch-container'))
      p5.createCanvas(GameData.GameWidth, GameData.GameHeight).parent('sketch-container').position((window.innerWidth-GameData.GameWidth)/2,GameData.GameHeight/4,'absolute');
    p5.background(0);
    p5.fill(255,255,255);
    p5.text("please sign-in before playing", GameData.GameWidth/2 - GameData.GameWidth/4, GameData.GameHeight/2 + GameData.GameHeight/24);
    return false;
  }
  else if(GameData.first_conection_val === false)
	{
		GameData.first_conection_val = true;
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
