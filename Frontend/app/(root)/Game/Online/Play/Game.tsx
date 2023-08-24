'use client'

import { useEffect,useContext,useState } from "react";
import p5 from "p5";
import './Game.css';
import { GetGameInfoContext, GameContextType } from '../../GameContext/GameContext';
import UserContext from "@/app/(root)/UserContext";
import { GameClass } from './GameClass/GameClass';
import { BallAnimation, Racket1Animation, Racket2Animation, first_conection } from './GameFunctions/GameLogic';
import { Ball, LineCenter, Racket1, Racket2 } from './GameFunctions/GameDrawer';
import { NewValue, initialze_data } from './GameFunctions/Initialise';
import { GameStatusChecker } from './GameFunctions/GameChecker';


export let GameData:GameClass;

const Game = () => {
  const contexUser = useContext(UserContext);
  const GameContext = GetGameInfoContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() => {
    GameData = new GameClass();
    console.log(GameContext.GameInfo.host,GameContext.GameInfo.Speed,GameContext.GameInfo.Points);
    initialze_data(GameContext);
    const sketch = (p5: p5) => {
      p5.setup = () => {
      };
      
      p5.draw = () => {
        NewValue(p5);      
        if(!first_conection(p5,GameContext))
          return ;
        if(GameStatusChecker(p5,GameContext))
        {
          if(document.getElementById('sketch-container') && typeof window !== "undefined")
            p5.createCanvas(GameData.GameWidth, GameData.GameHeight).parent('sketch-container').position((window.innerWidth-GameData.GameWidth)/2,GameData.GameHeight/4,'absolute');
          p5.background(25);
          BallAnimation(GameContext);
          if (GameContext.GameInfo.host)
            Racket1Animation(p5);
          else
            Racket2Animation(p5);
          LineCenter(p5);
          setReslt1(GameData.Result1Val);
          setReslt2(GameData.Result2Val);
          Ball(p5,GameData.BallXpos,GameData.BallYpos,GameData.BallWidth,GameData.BallHeight);
          Racket1(p5,GameData.Racket1Xpos,GameData.Racket1Ypos,GameData.Racket1Width,GameData.Racket1Height);
          Racket2(p5,GameData.Racket2Xpos,GameData.Racket2Ypos,GameData.Racket2Width,GameData.Racket2Height);
        }
        else
          return;
      };
      p5.keyReleased = () =>{
        p5.key = '';
      }
    };

    const test:p5 = new p5(sketch);
    return()=>
    {
      test.remove();
      GameData.access = false;
    };
  }, []);

  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[100vh]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center rounded-tl-xl" src={GameContext.GameInfo.myimage!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center rounded-tr-xl" src={GameContext.GameInfo.enemmyimage!}/>
      </div>
      <div  className=" absolute flex h-[12.5vw] w-[25%] lg:h-[125px] lg:w-[250px] left-1/2 transform -translate-x-1/2 my-auto  rounded-xl z-20">
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{GameContext.GameInfo.myusername!}</div>
        <div className="relative my-auto  flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt1}</div>
        <div className="relative my-auto mx-auto flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">-</div>
        <div className="relative my-auto   flex z-20 text-white text-[2.1vw] lg:text-[1.5vw]">{reslt2}</div>
        <div className="relative my-auto px-[5%]  flex z-20 text-white text-[1.5vw] lg:text-[1vw]">{GameContext.GameInfo.enemmyusername!.toString()}</div>
      </div>
      {/* <div className="relative flex h-[40vw] w-[60%] mx-auto"> */}
        <div id="sketch-container" className="absolute flex mx-auto my-auto w-[100%] h-[50vw]"></div>
      {/* </div> */}
    </div>
  );
}

export default Game;
