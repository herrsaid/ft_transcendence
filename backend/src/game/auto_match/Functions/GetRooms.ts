import { Rooms } from "../lobbie.gateway";
import { Socket } from 'socket.io';


export function GetRoomsLogic(client: Socket): void
{
    let Public_Rooms= 0;
    for(let a = 0;a<Rooms.length;a++)
    if(Rooms[a].RoomMood != false)
        Public_Rooms++;
    client.emit('GetRooms',Public_Rooms);
}