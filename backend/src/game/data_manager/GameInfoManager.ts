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
        const GameInfo:GameUserInfo| null =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player2UserName);
        console.log(GameObj.PlayersInfo.Player2UserName);
        if(!GameInfo)
        {
            const newGameInfo:GameUserInfo =  new GameUserInfo;
            newGameInfo.username = GameObj.PlayersInfo.Player2UserName;
            newGameInfo.totalgames = 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
            {
                newGameInfo.totalwins = 1;
                newGameInfo.totalosses = 0;
            }
            else
            {
                newGameInfo.totalosses = 1;
                newGameInfo.totalwins = 0;
            }
                newGameInfo.totalarchievements = 0;
            await this.GameUserInfo.save(newGameInfo);
        }
        else
        {
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = 0;
            // await this.GameUserInfo.update(GameInfo,{key:GameInfo.key});
            Object.assign(GameUserInfo, GameInfo);
            await this.GameUserInfo.save(GameInfo);
        }

        const GameInfo2:GameUserInfo | null =  await this.GetHistoryByUsername(GameObj.PlayersInfo.Player1UserName);
        console.log(GameObj.PlayersInfo.Player1UserName);
        if(!GameInfo2)
        {
            const newGameInfo2:GameUserInfo =  new GameUserInfo;
            newGameInfo2.username = GameObj.PlayersInfo.Player1UserName;
            newGameInfo2.totalgames = 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
            {
                newGameInfo2.totalwins = 1;
                newGameInfo2.totalosses = 0;
            }
            else
            {
                newGameInfo2.totalosses = 1;
                newGameInfo2.totalwins = 0;
            }
            newGameInfo2.totalarchievements = 0;
            await this.GameUserInfo.save(newGameInfo2);
        }
        else
        {
            GameInfo2.totalgames += 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo2.totalwins += 1;
            else
                GameInfo2.totalosses += 1;
            GameInfo2.totalarchievements = 0;
            // await this.GameUserInfo.update(GameInfo2,{key:GameInfo2.key});
            Object.assign(GameUserInfo, GameInfo2);
            await this.GameUserInfo.save(GameInfo2);
        }
    }

    async GetHistoryByUsername(username:string):Promise<GameUserInfo | null>
    {
        return await this.GameUserInfo.findOne({ where: { username:username } });
    }
}