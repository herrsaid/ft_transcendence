import { newGameInfo,access } from "../Components/SettingsComponent";
import { InGame } from '@/app/(root)/Components/Notification/Notification';
import { GameContextType } from '../../../Game/GameContext/GameContext';
import { socket } from '@/app/(root)/Game/Online/Socket/auto_match_socket';

export function StartRoom(router: any,toast:any,GameContext:GameContextType,username1:any)
{
    const notification:HTMLElement| null = document.getElementById('notification');
    const settings = document.getElementById("Settings");
    const loading = document.getElementById("wifi-loader");
    // const input_elem:any = document.getElementById("input_val");
    // let input_value:String = ''; 
    // if (input_elem)
    //     input_value = input_elem.value;
    newGameInfo.myusername = GameContext.GameInfo.myusername;
    newGameInfo.myimage = GameContext.GameInfo.myimage;
    if(newGameInfo.Online === 1)
    {
        InGame.IL = true;
        if(notification)
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
            inputValue: username1,
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
        socket.on("InvalidData",(message: string)=>
        {
            if(access && settings && loading)
            {
                InGame.IL = false;
                settings.style.filter = "blur(0px)";
                settings.style.animation = "Animation 1s";
                loading.style.opacity = "0";
                socket.emit("conection_closed");
            }
            toast.closeAll();
            toast({title: 'Error',description: message,position: 'top-right',status: 'error',duration: 5000,isClosable: true,});
            
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
                toast.closeAll();
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
}
