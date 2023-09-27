import { newGameInfo,access } from '../Settings';
import { socket } from '../../../../Online/Socket/auto_match_socket'
import { GameContextType } from '../../../../GameContext/GameContext';
import { InGame } from '@/app/(root)/Components/Notification/Notification';

export function StartRoom(router: any,toast:any,GameContext:GameContextType)
{
    try
    {
        const notification:HTMLElement| null = document.getElementById('notification');
        const settings = document.getElementById("Settings");
        const loading = document.getElementById("wifi-loader");
        const input_elem:any = document.getElementById("input_val");
        let input_value:String = ''; 
        if (input_elem)
            input_value = input_elem.value;
        newGameInfo.myusername = GameContext.GameInfo.myusername;
        newGameInfo.myimage = GameContext.GameInfo.myimage;
        if(newGameInfo.Online === 1)
        {
            InGame.IL = true;
            if(notification && InGame.RM === false)
            {
                notification.style.opacity = "0";
                notification.style.display = "none";
                socket.emit("RequestRefused",{targrt:GameContext.GameInfo.enemmyusername});
            }
            socket.emit('CreateRoom',{
                speed: newGameInfo.Speed,
                points: newGameInfo.Points,
                myusername: GameContext.GameInfo.myusername,
                myimage: GameContext.GameInfo.myimage,
                roomMood: !!newGameInfo.RoomMood,
                inputValue: input_value,
            });
            socket.on("RequestRefused",()=>
            {
                if(access && settings && loading)
                {
                    InGame.IL = false;
                    settings.style.filter = "blur(0px)";
                    settings.style.animation = "Animation 1s";
                    loading.style.opacity = "0";
                    socket.emit("conection_closed");
                }
            });
            socket.on('CreateRefused', (message: string) => {
                if(access)
                {
                    if(settings && loading)
                    {
                        if(message === "you can't Create two Rooms")
                            settings.style.filter = "blur(0px)";
                        else
                        {
                            InGame.IL = false;
                            settings.style.filter = "blur(0px)";
                            settings.style.animation = "Animation 1s";
                            loading.style.opacity = "0";
                            socket.emit("conection_closed");
                        }
                    }
                        toast({
                        title: 'Error',
                        description: message,
                        position: 'top-right',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                }  
            });
            if(settings && loading)
            {
                settings.style.filter = "blur(15px)";
                loading.style.opacity = "1";
                settings.style.animation = "Animation 3s infinite";
            }
                socket.on('SendData', (username,playerimg,data) => {
                if(access)
                {
                    newGameInfo.enemmyusername = username;
                    newGameInfo.enemmyimage = playerimg;
                    newGameInfo.host = data;
                    newGameInfo.Access = 1;
                    GameContext.SetGameInfo(newGameInfo);
                    router.replace('/Game/Online/Play');
                }
            });
        }
        else
        {
            if(newGameInfo.other_tools === 1)
            {
                GameContext.SetGameInfo(newGameInfo);
                router.replace('/Game/Ofline/2P');
            }
            else
            {
                GameContext.SetGameInfo(newGameInfo);
                router.replace('/Game/Ofline/BOT');
            }
        }
    }
    catch{}
}
