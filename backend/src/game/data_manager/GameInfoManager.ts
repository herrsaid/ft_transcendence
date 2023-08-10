import { Injectable } from "@nestjs/common";
import { GameArchievement, GameUserInfo } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";
import { ArchievementManager } from "./ArchievementManager";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class GameInfoManager
{
    constructor(@InjectRepository(GameUserInfo) private GameUserInfo: Repository<GameUserInfo>,private Archievement:ArchievementManager,
    private UserManager:UserService){}
    
    async CheckArchievementLogic(GameInfo:GameUserInfo): Promise<number>
    {
        let ArchievementLength:number;
        if(GameInfo.totalwins === 1 && GameInfo.totalgames === 1)
            this.Archievement.NewArchievement(GameInfo.userid,'FirstTimeWin');
        if(GameInfo.totalosses === 1 && GameInfo.totalgames === 1)
            this.Archievement.NewArchievement(GameInfo.userid,'FirstTimeLose');
        if(GameInfo.totalgames === 5)
            this.Archievement.NewArchievement(GameInfo.userid,'Play5Times');
        else if(GameInfo.totalgames === 10)
            this.Archievement.NewArchievement(GameInfo.userid,'Play10Times');
        else if(GameInfo.totalgames === 15)
            this.Archievement.NewArchievement(GameInfo.userid,'Play15Times');
        if(GameInfo.totalwins === 3)
            this.Archievement.NewArchievement(GameInfo.userid,'Win3Times');
        else if(GameInfo.totalwins === 6)
            this.Archievement.NewArchievement(GameInfo.userid,'Win6Times');
        else if(GameInfo.totalwins === 9)
            this.Archievement.NewArchievement(GameInfo.userid,'Win9Times');
        if(GameInfo.totalosses === 3)
            this.Archievement.NewArchievement(GameInfo.userid,'Lose3Times');
        else if(GameInfo.totalosses === 6)
            this.Archievement.NewArchievement(GameInfo.userid,'Lose6Times');
        else if(GameInfo.totalosses === 9)
            this.Archievement.NewArchievement(GameInfo.userid,'Lose9Times');
        ArchievementLength = (await (this.Archievement.GetAllUserArchievementByUsername(GameInfo.userid))).length;
        if(ArchievementLength >= 4)
            this.Archievement.NewArchievement(GameInfo.userid,'Gain4Archievement');
        else if(ArchievementLength >= 9)
            this.Archievement.NewArchievement(GameInfo.userid,'Gain9Archievement');
        else if(ArchievementLength >= 14)
            this.Archievement.NewArchievement(GameInfo.userid,'Gain14Archievement');
        else if(ArchievementLength === 15)
            this.Archievement.NewArchievement(GameInfo.userid,'ArchievementColector');
        ArchievementLength = (await (this.Archievement.GetAllUserArchievementByUsername(GameInfo.userid))).length;
        return (ArchievementLength);

    }
    
    async CreateOrUpdateGameInfo(GameObj:data)
    {
        const User1 =  await this.UserManager.findOneByUsername(GameObj.PlayersInfo.Player2UserName);
        const User2 =  await this.UserManager.findOneByUsername(GameObj.PlayersInfo.Player1UserName);
        let GameInfo:GameUserInfo| null;
        let GameInfo2:GameUserInfo| null;
        if(User1)
            GameInfo =  await this.GetGameInfoByUsername(User1.id);
        if(User2)
            GameInfo2 =  await this.GetGameInfoByUsername(User2.id);
        if(!GameInfo)
        {
            const newGameInfo:GameUserInfo =  new GameUserInfo;
            if(User1)
                newGameInfo.userid = User1.id;
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
            newGameInfo.totalarchievements = await this.CheckArchievementLogic(newGameInfo);
            await this.GameUserInfo.save(newGameInfo);
        }
        else
        {
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
                GameInfo.totalwins += 1;
            else
                GameInfo.totalosses += 1;
            GameInfo.totalarchievements = await this.CheckArchievementLogic(GameInfo);
            Object.assign(GameUserInfo, GameInfo);
            await this.GameUserInfo.save(GameInfo);
        }

        if(!GameInfo2)
        {
            const newGameInfo2:GameUserInfo =  new GameUserInfo;
            if(User2)
                newGameInfo2.userid =  User2.id;
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
            newGameInfo2.totalarchievements = await this.CheckArchievementLogic(newGameInfo2);
            await this.GameUserInfo.save(newGameInfo2);
        }
        else
        {
            GameInfo2.totalgames += 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
                GameInfo2.totalwins += 1;
            else
                GameInfo2.totalosses += 1;
            GameInfo2.totalarchievements = await this.CheckArchievementLogic(GameInfo2);
            Object.assign(GameUserInfo, GameInfo2);
            await this.GameUserInfo.save(GameInfo2);
        }
    }

    async GetGameInfoByUsername(UserId:number):Promise<GameUserInfo | null>
    {
        return await this.GameUserInfo.findOne({ where: { userid:UserId } });
    }
}
