import exp from "constants";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Groups from "./Groups.entity";
import { User } from "src/entities/user/user.entity";

@Entity()
export default class GroupUsers
{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    role:string = "user"
    @ManyToOne(()=> User, (user) => user.groupusers)
    user:User;
    @ManyToOne(()=> Groups, (member) => member.members)
    group:Groups
}