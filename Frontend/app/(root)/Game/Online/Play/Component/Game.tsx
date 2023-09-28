'use client'

import { useEffect,useState } from "react";
import p5 from "p5";
import '../Game.css';
import { GetGameInfoContext} from '../../../GameContext/GameContext';
import { GameDataType, GetGameDataContext } from '../GameClass/GameClass';
import { BallAnimation, Racket1Animation, Racket2Animation, first_conection } from '../GameFunctions/GameLogic';
import { Ball, LineCenter, Racket1, Racket2 } from '../GameFunctions/GameDrawer';
import { NewValue, initialze_data } from '../GameFunctions/Initialise';
import { GameStatusChecker } from '../GameFunctions/GameChecker';
import { InGame } from "@/app/(root)/Components/Notification/Notification";
import { socket } from "../../Socket/auto_match_socket";
import { player1, player2 } from "../../Socket/start_game_socket";

const Game = ({ router }: any) => {
  const GameContext = GetGameInfoContext();
  const GameDataContext = GetGameDataContext();
  const [reslt1, setReslt1] = useState(0);
  const [reslt2, setReslt2] = useState(0);
  useEffect(() => {
    let test:p5;
    let interval:NodeJS.Timer;
    let BottomNav:HTMLElement| null = document.getElementById('BottomNav');
    let LeftNav:HTMLElement| null = document.getElementById('LeftNav');
    try
    {
      if(BottomNav && LeftNav)
      {
          BottomNav.style.display = "block";
          LeftNav.style.display = "none";
      }
      GameDataContext.SetGameData(new GameDataType());
      // console.log(GameContext.GameInfo.host,GameContext.GameInfo.Speed,GameContext.GameInfo.Points);
      initialze_data(GameContext,GameDataContext);
      import('p5').then((p5Module) => {
        const p5 = p5Module.default;
        const sketch = (p5: p5) => {
          p5.setup = () => {
          };
          
          p5.draw = () => {
            NewValue(p5,GameDataContext);      
            if(!first_conection(p5,GameContext,GameDataContext,router))
              return ;
            if(GameStatusChecker(p5,GameContext,GameDataContext))
            {
              if(document.getElementById('sketch-container') && typeof window !== "undefined")
                p5.createCanvas(GameDataContext.GameData.GameWidth, GameDataContext.GameData.GameHeight)
                  .parent('sketch-container')
                  .position((window.innerWidth-GameDataContext.GameData.GameWidth)/2,GameDataContext.GameData.GameHeight/4,'absolute');
                p5.background("#090533");
              BallAnimation(GameContext,GameDataContext);
              if (GameContext.GameInfo.host)
                Racket1Animation(p5,GameDataContext);
              else
                Racket2Animation(p5,GameDataContext);
              LineCenter(p5,GameDataContext);
              setReslt1(GameDataContext.GameData.Result1Val);
              setReslt2(GameDataContext.GameData.Result2Val);
              Ball(p5,GameDataContext);
              Racket1(p5,GameDataContext);
              Racket2(p5,GameDataContext);
            }
            else
              return;
          };
          p5.keyPressed = () =>
          {  
            if (p5.key == 'ArrowUp' || p5.key == 'ArrowDown')
              document.body.style.overflow = "hidden";
          }
          p5.keyReleased = () =>
          {
            document.body.style.overflow = "scroll";
            p5.key = '';
          }
        };
        test = new p5(sketch);
        interval = setInterval(()=>{if(!InGame.IG){router.replace('/Game/Lobbie');}},3000);
      });
    }
    catch{}
    return()=>
    {
      // if(BottomNav && LeftNav)
      // {
      //   BottomNav.style.display = "none";
      //   LeftNav.style.display = "block";
      // }
      document.body.style.overflow = "scroll";
      clearInterval(interval);
      test.remove();
      InGame.IG = false;
      GameDataContext.SetGameData(new GameDataType);
      player1.emit('conection_closed');
      player2.emit('conection_closed');
      socket.emit('conection_closed');
    };
  }, []);

  if(!GameContext.GameInfo.Access)
    return (<div></div>);
  return (
    <div className="relative flex mx-auto my-auto w-[100%] h-[100vh]">
      <div className=" relative flex h-[12.5vw] w-[50%] lg:h-[125px] lg:w-[500px] mx-auto">
        <img className=" relative flex w-[25%] h-[100%] bg-center brightness-[0.75] rounded-tl-xl" src={GameContext.GameInfo.myimage!.toString()}/>
        {/* <img className=" relative flex w-[50%] h-[50%%] bg-center" src={myimage1!}/> */}
        <div className="absolute flex w-[60%] h-[100%] left-[20%] trapezoid z-10">
        </div>
        {/* <img className="relative flex w-[50%] h-[25vw] bg-center" src={enemmyimage1!}/> */}
        <img className="relative flex left-[50%] w-[25%] h-[100%] bg-center brightness-[0.75] rounded-tr-xl" src={GameContext.GameInfo.enemmyimage!}/>
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
