import { Socket } from 'socket.io';
import { Online, Rooms } from "../lobbie.gateway";
import { RoomClass } from '../auto_match_class/RoomClass';
import { OnlineClass } from '../auto_match_class/OnlineClass';
import { UserService } from 'src/user/services/user.service';


export function ConectionClosedLogic(client: Socket): RoomClass[] {
    for(let a = 0;a<Rooms.length; a++)
      Rooms[a].players = Rooms[a].players.filter(player => player.PlayerSocket !== client);
    return (Rooms.filter(elem => elem.players.length !== 0));
  }

export async function DisconnectLogic(client: Socket, UserManager:UserService): Promise<{Rooms:RoomClass[],Online:OnlineClass[]}> {
    let obj:{Rooms:RoomClass[],Online:OnlineClass[]} = {Rooms:[new RoomClass(),],Online:[new OnlineClass(),]};
  for(let a = 0;a<Rooms.length; a++)
    Rooms[a].players = Rooms[a].players.filter(player => player.PlayerSocket !== client);
    obj.Rooms = Rooms.filter(elem => elem.players.length !== 0);
  let test = Online.find(elem => elem.PlayerSocket.id === client.id)
  if(test)
  {
    // console.log(`player ${test.Player} disconnect`);
    await UserManager.updateStatus(test.Player,{status:false});
  }
  //   console.log(`Remove Old Room && player ${test.Player} disconnect`);
    obj.Online = Online.filter(elem => elem.PlayerSocket.id !== client.id);
    return(obj);
}