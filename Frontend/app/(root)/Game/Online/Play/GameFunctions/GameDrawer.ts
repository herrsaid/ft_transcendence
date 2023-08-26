import p5 from 'p5';
import { GameDataContextType } from '../GameClass/GameClass';

export function Ball(p5: p5,GDC:GameDataContextType)
{
  p5.fill(255,255,255);
  p5.ellipse(GDC.GameData.BallXpos, GDC.GameData.BallYpos, GDC.GameData.BallWidth, GDC.GameData.BallHeight);
}
export function LineCenter(p5: p5,GDC:GameDataContextType)
{
  p5.fill(99,102,241);
  for(let a=0;a<GDC.GameData.GameWidth/2;a+=35)
    p5.rect(GDC.GameData.GameWidth/2, a, 5, 30,20);
}
export function Racket1(p5: p5,GDC:GameDataContextType)
{
  p5.fill(55,48,163);
  p5.rect(GDC.GameData.Racket1Xpos,GDC.GameData.Racket1Ypos,GDC.GameData.Racket1Width,GDC.GameData.Racket1Height,10);
}

export function Racket2(p5: p5,GDC:GameDataContextType)
{
  p5.fill(55,48,163);
  p5.rect(GDC.GameData.Racket2Xpos,GDC.GameData.Racket2Ypos,GDC.GameData.Racket2Width,GDC.GameData.Racket2Height,10);
}