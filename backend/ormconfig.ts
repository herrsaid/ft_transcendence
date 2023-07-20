import { Achievevement } from "src/entities/achievevements.entity";
import { FriendRequest } from "src/entities/friend-request.entity";
import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


const config : PostgresConnectionOptions = {
    type: "postgres",
    database: "testDB",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    entities:[User,Achievevement,FriendRequest],
    synchronize: true,
};

export default config;