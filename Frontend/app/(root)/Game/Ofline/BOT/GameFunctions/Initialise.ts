import p5 from 'p5';
import { GameData } from '../Game';


export function NewValue(p5:p5)
{
  let canvas:p5.Element| null = null;
  let w:number = Math.floor(window.innerWidth) ;
  let h:number = Math.floor(window.innerWidth/2);
  if(document.getElementById('sketch-container'))
    canvas = p5.createCanvas(GameData.GameWidth, GameData.GameHeight).parent('sketch-container');
  if((w !== GameData.GameWidth || h !== GameData.GameHeight) && window.innerWidth < 1080)
  {
    GameData.BallXpos = Math.floor(((GameData.BallXpos*100)/GameData.GameWidth)*(w/100));
    GameData.BallYpos = Math.floor(((GameData.BallYpos*100)/GameData.GameHeight)*(h/100));
    GameData.Racket1Ypos = Math.floor(((GameData.Racket1Ypos*100)/GameData.GameHeight)*(h/100));
    GameData.Racket2Ypos = Math.floor(((GameData.Racket2Ypos*100)/GameData.GameHeight)*(h/100));
    GameData.GameWidth = w;
    GameData.GameHeight =  h;
    GameData.BallWidth = Math.floor(GameData.GameWidth/52);
    GameData.BallHeight = Math.floor(GameData.GameHeight/26);
    GameData.Racket1Width = Math.floor(GameData.GameWidth/80);
    GameData.Racket1Height = Math.floor(GameData.GameHeight/6);
    GameData.Racket1Xpos = Math.floor(GameData.GameWidth/160);
    GameData.Racket2Width = Math.floor(GameData.GameWidth/80);
    GameData.Racket2Height = Math.floor(GameData.GameHeight/6);
    GameData.Racket2Xpos = Math.floor(GameData.GameWidth-((GameData.GameWidth/80)+(GameData.GameWidth/160)));
    p5.createCanvas(GameData.GameWidth, GameData.GameHeight).parent('sketch-container').position((window.innerWidth-GameData.GameWidth)/2,GameData.GameHeight/4,'absolute');
    p5.background(25);
  }
  if(canvas)
    canvas.position((window.innerWidth-GameData.GameWidth)/2,GameData.GameHeight/4,'absolute');
}
