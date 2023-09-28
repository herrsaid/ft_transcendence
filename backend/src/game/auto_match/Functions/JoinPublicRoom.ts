import { Rooms } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { UserInfo } from "src/game/PingPong.dto";
import { PlayerClass } from "../auto_match_class/PlayerClass";
import { GameObj } from "src/game/game_brain/logic/Brain";
import { UserService } from "src/user/services/user.service";
import { User } from "src/entities/user/user.entity";

export async function JoinPublicRoomLogic(client: Socket, data: UserInfo,UserManager:UserService): Promise<void> {
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
      const user1:User = await UserManager.findOneByUsername(data.username);
      const user2:User = await UserManager.findOneByUsername(Rooms[data.roomNumber].players[0].Player);
      if(user1 && user2)
      {
        console.log(user1);
        console.log(user2);
        const status = await UserManager.getBlockStatus(user1.id,user2).toPromise();
        console.log(status);
        if(status)
        {
          if (status.status == "waiting-for-unblock" || status.status == "blocked")
          {
            client.emit('JoinRefused',"error: you can't send invite to this user");
            return;
          }
        }
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