import { Rooms } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { UserInfo } from "src/game/PingPong.Entity";
import { PlayerClass } from "../auto_match_class/PlayerClass";


export function JoinPublicRoomLogic(client: Socket, data: UserInfo): void {
    let Public_Rooms= 0;
    for(let a = 0;a<Rooms.length;a++)
    {
      if(Rooms[a].RoomMood != false)
        Public_Rooms++;
      if(Public_Rooms == data.RoomNumber)
      {
        data.RoomNumber = a;
        break;
      }
    }
    if(Rooms[data.RoomNumber])
    {
      let player_data:PlayerClass = new PlayerClass;
      if(data.Username === null)
      {
        client.emit('JoinRefused','please (log-in/sign-in) to accept your join');
        return ;
      }
      else if (data.Username === Rooms[data.RoomNumber].players[0].Player)
      {
        client.emit('JoinRefused',"You can't Join to yourself");
        return ;
      }
      player_data.Player = data.Username;
      player_data.PlayerImg = data.myimage;
      player_data.PlayerId = client.id;
      player_data.PlayerSocket = client;
      if(Rooms[data.RoomNumber].players.length < 2)
      {
        Rooms[data.RoomNumber].players.push(player_data);
        console.log("Push New Room");
        Rooms[data.RoomNumber].players[0].PlayerSocket.emit(
          'SendData',Rooms[data.RoomNumber].players[1].Player,Rooms[data.RoomNumber].players[1].PlayerImg,true);
          Rooms[data.RoomNumber].players[1].PlayerSocket.emit(
            'SendData',Rooms[data.RoomNumber].players[0].Player,Rooms[data.RoomNumber].players[0].PlayerImg,false);
            client.emit('JoinAccepted',Rooms[data.RoomNumber].Speed,Rooms[data.RoomNumber].Points);
      }
      else
      {
        client.emit('JoinRefused','Room is full or already in match');
        return ;
      }
    }
        console.log(Rooms);
        console.log("Launch Public Room");
        for(let a=0;a<Rooms[data.RoomNumber].players.length;a++)
          Rooms[data.RoomNumber].players[a].PlayerSocket.emit('conection_closed');
  }