
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne, Admin } from "typeorm";
import { Messages } from "./Message.entity";
import { User } from "src/entities/user/user.entity";
import { Admins } from "./Admins.entity";

@Entity()
export default class Groups{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string
    @ManyToMany(() => User, (user) => user.groups)
    @JoinTable()
    users: User[];
    @OneToMany(() => Messages, (messages) => messages.group)
    messages: Messages[]
    @OneToOne(() => Admins)
    @JoinColumn()
    admins:Admins
}