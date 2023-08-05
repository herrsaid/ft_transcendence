import { Messages } from "Database/entity/Message.entity";
import { Achievevement } from "src/entities/achievevements/achievevements.entity";
import { FriendRequest } from "src/entities/friend/friend-request.entity";
import { User } from "src/entities/user/user.entity";
import { GameUserInfo, History } from "src/game/PingPong.Entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


const config : PostgresConnectionOptions = {
    type: "postgres",
    database: "testDB",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    entities:[User,Achievevement,FriendRequest, Messages,History,GameUserInfo],
    synchronize: true,
};

export default config;