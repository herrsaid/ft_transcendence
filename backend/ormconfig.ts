import * as dotenv from 'dotenv';
dotenv.config();

import Groups from "Database/entity/Groups.entity";
import { Messages } from "Database/entity/Message.entity";
import { FriendRequest } from "src/entities/friend/friend-request.entity";
import { User } from "src/entities/user/user.entity";
import { GameArchievement, GameUserInfo, History } from "src/game/PingPong.Entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import GroupUsers from 'Database/entity/GroupUsers.entity';


const config : PostgresConnectionOptions = {
    type: "postgres",
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities:[User,FriendRequest, Messages,History,GameUserInfo,GameArchievement,Groups, GroupUsers],
    synchronize: true,
};

export default config;