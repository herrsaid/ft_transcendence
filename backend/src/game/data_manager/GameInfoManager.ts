import { Injectable } from "@nestjs/common";
import { GameUserInfo } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";

@Injectable()
export class GameInfoManager
{

    constructor(@InjectRepository(GameUserInfo) private GameUserInfo: Repository<GameUserInfo>,){}
    
    async CreateOrUpdateGameInfo(GameObj:data)
    {
        const GameInfo:GameUserInfo =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName);
        if(GameInfo === null)
        {
            const GameInfo:GameUserInfo =  new GameUserInfo;
            GameInfo.username = GameObj.PlayersInfo.Player1UserName;
            GameInfo.totalgames = 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
            await this.GameUserInfo.save(GameInfo);
        }
        else
        {
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
        await this.GameUserInfo.update(GameInfo,{key:GameInfo.key});
        }

        const GameInfo2:GameUserInfo =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player2UserName);
        if(GameInfo2 === null)
        {
            const GameInfo2:GameUserInfo =  new GameUserInfo;
            GameInfo2.username = GameObj.PlayersInfo.Player2UserName;
            GameInfo2.totalgames = 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo2.totalwins += 1;
            else
                GameInfo2.totalosses += 1;
                GameInfo2.totalarchievements = 0;
            await this.GameUserInfo.save(GameInfo2);
        }
        else
        {
            GameInfo2.totalgames += 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo2.totalwins += 1;
            else
                GameInfo2.totalosses += 1;
                GameInfo2.totalarchievements = 0;
            await this.GameUserInfo.update(GameInfo2,{key:GameInfo2.key});
        }
    }

    async GetHistoryByUsername(username:string):Promise<GameUserInfo>
    {
        return await this.GameUserInfo.findOneBy({username:username});
    }
}