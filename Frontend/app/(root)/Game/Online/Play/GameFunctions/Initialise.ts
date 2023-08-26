import p5 from 'p5';
import { socket } from '../../Socket/auto_match_socket';
import { GameContextType } from '../../../GameContext/GameContext';
import { GameDataContextType, GameDataSetterType } from '../GameClass/GameClass';


export function initialze_data(GameContext:GameContextType,GDC:GameDataContextType)
{
  console.log('user re-enter game page');
  socket.emit('conection_closed');
  GDC.GameData.GameWidth = 800;
  GDC.GameData.GameHeight = 400;
  GDC.GameData.GameSpeed = GameContext.GameInfo.Speed;
  GDC.GameData.BallWidth = GDC.GameData.GameWidth/52;
  GDC.GameData.BallHeight = GDC.GameData.GameHeight/26;
  GDC.GameData.BallXpos = GDC.GameData.GameWidth/2;
  GDC.GameData.BallYpos = GDC.GameData.GameHeight/2;
  GDC.GameData.Racket1Width = GDC.GameData.GameWidth/80;
  GDC.GameData.Racket1Height =  Math.floor(GDC.GameData.GameHeight/6);
  GDC.GameData.Racket1Xpos = 5;
  GDC.GameData.Racket1Ypos = (GDC.GameData.GameHeight/2) - (GDC.GameData.Racket1Height/2);
  GDC.GameData.Racket2Width = GDC.GameData.GameWidth/80;
  GDC.GameData.Racket2Height =  Math.floor(GDC.GameData.GameHeight/6);
  GDC.GameData.Racket2Xpos = GDC.GameData.GameWidth-15;
  GDC.GameData.Racket2Ypos = (GDC.GameData.GameHeight/2) - (GDC.GameData.Racket1Height/2);
  GDC.GameData.Result1Val = 0;
  GDC.GameData.Result2Val = 0;
  GDC.GameData.first_conection_val= false;
  GDC.GameData.access = true;
  GDC.GameData.message = '';
}


export function NewValue(p5:p5,GDC:GameDataContextType)
{
  if (typeof window === "undefined")
    return;
  let canvas:p5.Element| null = null;
  let w:number = Math.floor(window.innerWidth) ;
  let h:number = Math.floor(window.innerWidth/2);
  if(document.getElementById('sketch-container'))
    canvas = p5.createCanvas(GDC.GameData.GameWidth, GDC.GameData.GameHeight).parent('sketch-container');
  if((w !== GDC.GameData.GameWidth || h !== GDC.GameData.GameHeight) && window.innerWidth < 1080)
  {
    GDC.GameData.BallXpos = Math.floor(((GDC.GameData.BallXpos*100)/GDC.GameData.GameWidth)*(w/100));
    GDC.GameData.BallYpos = Math.floor(((GDC.GameData.BallYpos*100)/GDC.GameData.GameHeight)*(h/100));
    GDC.GameData.Racket1Ypos = Math.floor(((GDC.GameData.Racket1Ypos*100)/GDC.GameData.GameHeight)*(h/100));
    GDC.GameData.Racket2Ypos = Math.floor(((GDC.GameData.Racket2Ypos*100)/GDC.GameData.GameHeight)*(h/100));
    GDC.GameData.GameWidth = w;
    GDC.GameData.GameHeight =  h;
    GDC.GameData.BallWidth = Math.floor(GDC.GameData.GameWidth/52);
    GDC.GameData.BallHeight = Math.floor(GDC.GameData.GameHeight/26);
    GDC.GameData.Racket1Width = Math.floor(GDC.GameData.GameWidth/80);
    GDC.GameData.Racket1Height = Math.floor(GDC.GameData.GameHeight/6);
    GDC.GameData.Racket1Xpos = Math.floor(GDC.GameData.GameWidth/160);
    GDC.GameData.Racket2Width = Math.floor(GDC.GameData.GameWidth/80);
    GDC.GameData.Racket2Height = Math.floor(GDC.GameData.GameHeight/6);
    GDC.GameData.Racket2Xpos = Math.floor(GDC.GameData.GameWidth-((GDC.GameData.GameWidth/80)+(GDC.GameData.GameWidth/160)));
    if(document.getElementById('sketch-container'))
      p5.createCanvas(GDC.GameData.GameWidth, GDC.GameData.GameHeight)
        .parent('sketch-container')
        .position((window.innerWidth-GDC.GameData.GameWidth)/2,GDC.GameData.GameHeight/4,'absolute');
      p5.background("#090533");
  }
  else if (window.innerWidth >= 1080)
  {
    GDC.GameData.GameWidth = Math.floor(1080);
    GDC.GameData.GameHeight =  Math.floor(540);
    GDC.GameData.BallWidth = Math.floor(GDC.GameData.GameWidth/52);
    GDC.GameData.BallHeight = Math.floor(GDC.GameData.GameHeight/26);
    GDC.GameData.Racket1Width = Math.floor(GDC.GameData.GameWidth/80);
    GDC.GameData.Racket1Height = Math.floor(GDC.GameData.GameHeight/6);
    GDC.GameData.Racket1Xpos = Math.floor(GDC.GameData.GameWidth/160);
    GDC.GameData.Racket2Width = Math.floor(GDC.GameData.GameWidth/80);
    GDC.GameData.Racket2Height = Math.floor(GDC.GameData.GameHeight/6);
    GDC.GameData.Racket2Xpos = Math.floor(GDC.GameData.GameWidth-((GDC.GameData.GameWidth/80)+(GDC.GameData.GameWidth/160)));
    if(document.getElementById('sketch-container'))
      p5.createCanvas(GDC.GameData.GameWidth, GDC.GameData.GameHeight)
        .parent('sketch-container')
        .position((window.innerWidth-GDC.GameData.GameWidth)/2,GDC.GameData.GameHeight/4,'absolute');
      p5.background("#090533");
  }
  if(canvas)
    canvas.position((window.innerWidth-GDC.GameData.GameWidth)/2,GDC.GameData.GameHeight/4,'absolute');
}