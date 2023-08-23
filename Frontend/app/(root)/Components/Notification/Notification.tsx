import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { GameContextType, GameInfoType, GetGameInfoContext } from "../../Game/GameContext/GameContext";
import { socket } from "../../Game/Online/Socket/auto_match_socket";
import { useRouter } from "next/navigation";

const JoinPrivateRoom = (GameContext:GameContextType,RoomINdex:number,router: AppRouterInstance,access:boolean)=>
{
  let notification:HTMLElement| null = document.getElementById('notification');
    let newGameInfo:GameInfoType = GameContext.GameInfo;
    let obj = 
    {
        RoomNumber: RoomINdex,
        Username: GameContext.GameInfo.myusername,
        myimage: GameContext.GameInfo.myimage,
    };
    socket.emit("JoinPrivateRoom",obj);
    socket.on('SendData', (username,playerimg,data) => {
          newGameInfo.enemmyusername = username;
          newGameInfo.enemmyimage = playerimg;
          newGameInfo.host = data;
      });
      socket.on('JoinAccepted',(speed:number,points: number)=>
      {
          newGameInfo.Access=1;
          newGameInfo.Speed = speed;
          newGameInfo.Points = points;
          GameContext.SetGameInfo(newGameInfo);
          if(notification)
          {
            notification.style.opacity = "0";
            notification.style.display = "none";
          }
          router.replace(`/Game/Online/Play`);
    });
}

const Notification = ({RoomINdex,access}:{RoomINdex:number,access:boolean}) => 
{
    const router: AppRouterInstance = useRouter();
    const GameContext = GetGameInfoContext();
    return(
        <div id="notification"
          className='fixed w-[200px] h-[60px] top-[5px] left-1/2 transform -translate-x-1/2
          my-auto rounded-md bg-indigo-500 flex flex-wrap overflow-hidden
          opacity-0 z-50'
          onClick={()=>
          {
            if(access)
              JoinPrivateRoom(GameContext,RoomINdex,router,access)
          }} >
          <img className='relative w-[20px]  h-[20px] flex  mt-[10px] ml-[10px]' src="/info.png">
          </img>
          <div className='relative w-[60px] h-[25px] mt-[10px] ml-[10px] flex text-sm font-bold'>
              info
          </div>
          <div id="content" className='relative text-sm  ml-[40px] flex-none block w-full'>
          </div>
        </div>
    );
}
export default Notification;
