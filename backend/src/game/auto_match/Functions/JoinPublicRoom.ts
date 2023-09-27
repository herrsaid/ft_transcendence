import { Rooms } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { UserInfo } from "src/game/PingPong.dto";
import { PlayerClass } from "../auto_match_class/PlayerClass";
import { GameObj } from "src/game/game_brain/logic/Brain";

export function JoinPublicRoomLogic(client: Socket, data: UserInfo): void {
    let Public_Rooms= 0;
    for(let a = 0;a<Rooms.length;a++)
    {
      if(Rooms[a].RoomMood != false)
        Public_Rooms++;
      if(Public_Rooms == data.roomNumber)
      {
        data.roomNumber = a;
        break;
      }
    }
    if(Rooms[data.roomNumber])
    {
      let player_data:PlayerClass = new PlayerClass;
      if(data.username === null)
      {
        client.emit('JoinRefused','please (log-in/sign-in) to accept your join');
        return ;
      }
      else if (data.username === Rooms[data.roomNumber].players[0].Player)
      {
        client.emit('JoinRefused',"You can't Join to yourself");
        return ;
      }
      else if (Rooms.find((elem) => elem.players[0].Player === data.username))
      {
        client.emit('JoinRefused',"You can't Join to another room");
        return ;
      }
      else if (GameObj.find((elem) => elem.PlayersInfo.Player1UserName === data.username || elem.PlayersInfo.Player2UserName === data.username ))
      {
        client.emit('JoinRefused',"you are already in game");
        return ;
      }
      player_data.Player = data.username;
      player_data.PlayerImg = data.myimage;
      player_data.PlayerId = client.id;
      player_data.PlayerSocket = client;
      if(Rooms[data.roomNumber].players.length < 2)
      {
        Rooms[data.roomNumber].players.push(player_data);
        // console.log("Push New Room");
        Rooms[data.roomNumber].players[0].PlayerSocket.emit(
          'SendData',Rooms[data.roomNumber].players[1].Player,Rooms[data.roomNumber].players[1].PlayerImg,true);
          Rooms[data.roomNumber].players[1].PlayerSocket.emit(
            'SendData',Rooms[data.roomNumber].players[0].Player,Rooms[data.roomNumber].players[0].PlayerImg,false);
            client.emit('JoinAccepted',Rooms[data.roomNumber].Speed,Rooms[data.roomNumber].Points);
      }
      else
      {
        client.emit('JoinRefused','Room is full or already in match');
        return ;
      }
    }
        // console.log(Rooms);
        // console.log("Launch Public Room");
        for(let a=0;a<Rooms[data.roomNumber].players.length;a++)
          Rooms[data.roomNumber].players[a].PlayerSocket.emit('conection_closed');
  }