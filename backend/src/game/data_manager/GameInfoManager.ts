import { Injectable, NotFoundException } from "@nestjs/common";
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
        if(GameInfo.totalwins === 1)
            this.Archievement.NewArchievement(GameInfo.userid,'FirstTimeWin');
        if(GameInfo.totalosses === 1)
            this.Archievement.NewArchievement(GameInfo.userid,'FirstTimeLose');
        if(GameInfo.totalgames === 5)
            this.Archievement.NewArchievement(GameInfo.userid,'Play5Times');
        if(GameInfo.totalgames === 10)
            this.Archievement.NewArchievement(GameInfo.userid,'Play10Times');
        if(GameInfo.totalgames === 15)
            this.Archievement.NewArchievement(GameInfo.userid,'Play15Times');
        if(GameInfo.totalwins === 3)
            this.Archievement.NewArchievement(GameInfo.userid,'Win3Times');
        if(GameInfo.totalwins === 6)
            this.Archievement.NewArchievement(GameInfo.userid,'Win6Times');
        if(GameInfo.totalwins === 9)
            this.Archievement.NewArchievement(GameInfo.userid,'Win9Times');
        if(GameInfo.totalosses === 3)
            this.Archievement.NewArchievement(GameInfo.userid,'Lose3Times');
        if(GameInfo.totalosses === 6)
            this.Archievement.NewArchievement(GameInfo.userid,'Lose6Times');
        if(GameInfo.totalosses === 9)
            this.Archievement.NewArchievement(GameInfo.userid,'Lose9Times');
        ArchievementLength = (await (this.Archievement.GetAllUserArchievementByUsername(GameInfo.userid))).length;
        // console.log("ArchievementLength "+ ArchievementLength);
        if(ArchievementLength >= 4)
            this.Archievement.NewArchievement(GameInfo.userid,'Gain4Archievement');
        if(ArchievementLength >= 9)
            this.Archievement.NewArchievement(GameInfo.userid,'Gain9Archievement');
        if(ArchievementLength >= 13)
            this.Archievement.NewArchievement(GameInfo.userid,'Gain14Archievement');
        if(ArchievementLength >= 14)
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
        let rank:number = 0;
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
                    newGameInfo.rank = (GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  10;
                }
                else
                {
                    newGameInfo.totalosses = 1;
                    newGameInfo.totalwins = 0;
                    newGameInfo.rank =0;
                    rank = -(GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  10;
                    if(newGameInfo.rank - rank < 0)
                    newGameInfo.rank = 0;
                    else
                    newGameInfo.rank = -rank;
                }
                newGameInfo.totalarchievements = await this.CheckArchievementLogic(newGameInfo);
                await this.GameUserInfo.save(newGameInfo);
            }
            else
            {
            GameInfo.totalgames += 1;
            if(GameObj.PlayersInfo.Result1Val >= GameObj.PlayersInfo.Result2Val)
            {
                GameInfo.totalwins += 1;
                GameInfo.rank += (GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  10;
            }
            else
            {
                GameInfo.totalosses += 1;
                rank = -(GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  10;
                if(GameInfo.rank - rank < 0)
                    GameInfo.rank = 0;
                else
                    GameInfo.rank -= rank;
            }
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
                newGameInfo2.rank = (GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  10;
            }
            else
            {
                newGameInfo2.totalosses = 1;
                newGameInfo2.totalwins = 0;
                newGameInfo2.rank =0;
                rank = -(GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  10;
                if(newGameInfo2.rank - rank < 0)
                    newGameInfo2.rank = 0;
                else
                    newGameInfo2.rank = -rank;
            }
            newGameInfo2.totalarchievements = await this.CheckArchievementLogic(newGameInfo2);
            await this.GameUserInfo.save(newGameInfo2);
        }
        else
        {
            GameInfo2.totalgames += 1;
            if(GameObj.PlayersInfo.Result2Val >= GameObj.PlayersInfo.Result1Val)
            {
                GameInfo2.totalwins += 1;
                GameInfo2.rank += (GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  10;
            }
            else
            {
                GameInfo2.totalosses += 1;
                rank = -(GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  10;
                if(GameInfo2.rank - rank < 0)
                    GameInfo2.rank = 0;
                else
                    GameInfo2.rank -= rank;
            }
                GameInfo2.totalarchievements = await this.CheckArchievementLogic(GameInfo2);
            Object.assign(GameUserInfo, GameInfo2);
            await this.GameUserInfo.save(GameInfo2);
        }
    }

    async GetGameInfoByUsername(UserId:number):Promise<GameUserInfo | null>
    {
        try
        {
            return await this.GameUserInfo.findOne({ where: { userid:UserId } });
        }
        catch{
            throw new NotFoundException();
        }
    }

    async GetRankByUserId(userid:number)
    {
        try
        {
            let rank:string = 'beginner';
            let obj: GameUserInfo| null =  await this.GameUserInfo.findOne({ where: { userid:userid } });
            if(obj)
            {
                if(obj.rank < 50)
                    rank = 'beginner';
                if(obj.rank >= 100)
                    rank = 'bronze';
                if(obj.rank >= 200)
                    rank = 'silver';
                if(obj.rank >= 400)
                    rank = 'gold';
                if(obj.rank >= 500)
                    rank = 'diamond';
                if(obj.rank >= 600)
                    rank = 'platiniom';
                if(obj.rank >= 700)
                    rank = 'legendary';
            }
            let rankObj = {"rank" : rank}
            return await rankObj;
        }
        catch{
            let rankObj = {"rank" : ''}
            return await rankObj;
        }
        
    }
}
