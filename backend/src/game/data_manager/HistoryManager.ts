import { Injectable } from "@nestjs/common";
import { History } from '../PingPong.Entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { data } from "../game_brain/logic/game_server_class";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class HistoryManager
{

    constructor(@InjectRepository(History) private History: Repository<History>,
    private UserManager:UserService){}
    
    async NewHistory(GameObj:data)
    {
        const hstry:History = new History();
        const User1 = await this.UserManager.findOneByUsername(GameObj.PlayersInfo.Player1UserName);
        const User2 = await this.UserManager.findOneByUsername(GameObj.PlayersInfo.Player2UserName);
        if(User2)
            hstry.myuserid = User2.id;
        if(User1)
            hstry.enemmyuserid =  User1.id;
        hstry.myresult = GameObj.PlayersInfo.Result1Val;
        hstry.enemmyresult = GameObj.PlayersInfo.Result2Val;
        hstry.score = (GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  100;
        hstry.rank =  (GameObj.PlayersInfo.Result1Val-GameObj.PlayersInfo.Result2Val) *  10;
        await this.History.save(hstry);

        const hstry2:History = new History();
        if(User1)
            hstry2.myuserid = User1.id;
        if(User2)
            hstry2.enemmyuserid =  User2.id;
        hstry2.myresult = GameObj.PlayersInfo.Result2Val;
        hstry2.enemmyresult = GameObj.PlayersInfo.Result1Val;
        hstry2.score = (GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  100;
        hstry2.rank =  (GameObj.PlayersInfo.Result2Val-GameObj.PlayersInfo.Result1Val) *  10;
        await this.History.save(hstry2);
    }

    async GetAllHistorysByUsername(MyUserId:number):Promise<History[]>
    {
        return await this.History.findBy({myuserid:MyUserId});
    }
}