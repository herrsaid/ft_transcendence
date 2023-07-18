'use client'
import { useEffect } from "react";
import p5 from "p5";
import './Game.css'

const Game = () => {
  useEffect(() => {
    let x = 0;
let value:any;
    const sketch = (p5: p5) => {
      p5.setup = () => {
        value = p5.createCanvas(800, 400).parent('sketch-container').center();
        p5.background(25);
        p5.textSize(30);
        p5.fill('blue');
        p5.text('Player1', 150, 25);
        p5.textSize(30);
        p5.fill('red');
        p5.text('Player2', 550, 25);
        p5.fill(255, 204, 0);
        for(let a=0;a<400;a+=35)
            p5.rect(397.5, a, 5, 30,20);
        p5.fill(255,255,255);
        p5.ellipse(400, 200, 25, 25);
        p5.fill('blue');
        p5.rect(5, 170, 10, 60,10);
        p5.fill('red');
        p5.rect(785, 170, 10, 60,10);
      };

      p5.draw = () => {
        value.center();
      };
    };

    new p5(sketch);
  }, []);

  return <div id="sketch-container" ></div>;
};

export default Game;