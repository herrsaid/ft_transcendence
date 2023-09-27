import { Online } from "../lobbie.gateway";
import { Socket } from 'socket.io';
import { OnlineClass } from '../auto_match_class/OnlineClass';
import { UserService } from "src/user/services/user.service";
import { User } from "src/entities/user/user.entity";

export async function OnlineLogic(client: Socket, username:string, UserManager:UserService): Promise<void>
{
    let data:OnlineClass = new OnlineClass();
    data.Player = username;
    data.PlayerSocket = client;
    const user:User = await UserManager.findOneByUsername(username);
    if(user)
    {
        let elem:OnlineClass = Online.find((elem)=> elem.PlayerSocket.id === client.id);
        if(elem === undefined)
        {
            Online.push(data);
            await UserManager.updateStatus(username,{status:true});
            // console.log(`new player is online ${data.Player}`);
        }
        else if(elem.Player !== username)
        {
            elem.Player = username;
            await UserManager.updateStatus(username,{status:true});
            // console.log(`update player usename to: ${data.Player}`);
        }
    }
}