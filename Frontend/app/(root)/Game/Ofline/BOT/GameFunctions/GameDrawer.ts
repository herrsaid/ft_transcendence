import p5 from 'p5';
import { GameData } from '../Component/Game';

export function Ball(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill(255,255,255);
  p5.ellipse(x, y, w, h);
}
export function LineCenter(p5: p5)
{
  p5.fill(99,102,241);
  for(let a=0;a<GameData.GameWidth/2;a+=35)
    p5.rect(GameData.GameWidth/2, a, 5, 30,20);
}
export function Racket1(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill(55,48,163);
  p5.rect(x, y, w, h,10);
}

export function Racket2(p5: p5, x: number, y: number, w: number, h: number)
{
  p5.fill(55,48,163);
  p5.rect(x, y, w, h,10);
}