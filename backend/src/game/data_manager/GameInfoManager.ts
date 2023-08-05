import { Injectable } from "@nestjs/common";
import { GameUserInfo } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";

@Injectable()
export class GameInfoManager
{

    constructor(@InjectRepository(GameUserInfo) private GameUserInfo: Repository<GameUserInfo>,){}
    
    async NewHistory(GameObj:data)
    {
        const GameInfo:GameUserInfo =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName);
        GameInfo.totalgames += 1;
        if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result1Val)
            GameInfo.totalwins += 1;
        else
            GameInfo.totalosses += 1;
        GameInfo.totalarchievements = 0;
        this.GameUserInfo.update(GameInfo,new GameUserInfo);
    }

    GetHistoryByUsername(username:string):Promise<GameUserInfo>
    {
        return this.GameUserInfo.findOneBy({username:username});
    }
}