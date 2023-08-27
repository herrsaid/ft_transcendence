import { Online } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { OnlineClass } from '../auto_match_class/OnlineClass';

export function OnlineLogic(client: Socket, username:string ): void
{
    let data:OnlineClass = new OnlineClass();
    data.Player = username;
    data.PlayerSocket = client;
    if(username != '')
    {
        let elem:OnlineClass = Online.find((elem)=> elem.PlayerSocket.id === client.id);
        if(elem === undefined)
        {
        Online.push(data);
        console.log(`new player is online ${data.Player}`);
        }
        else if(elem.Player !== username)
        {
        elem.Player = username;
        console.log(`update player usename to: ${data.Player}`);
        }
    }
}