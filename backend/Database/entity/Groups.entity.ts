
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne, Admin } from "typeorm";
import { Messages } from "./Message.entity";
import GroupUsers from "./GroupUsers.entity";

@Entity()
export default class Groups{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type:string = "public"
    @Column()
    password:string = null;
    @Column()
    size:number = 0
    @Column()
    name:string
    @OneToMany(() => Messages, (messages) => messages.group)
    messages: Messages[]
    @OneToMany(() => GroupUsers, (group) => group.group)
    members:GroupUsers[]
}