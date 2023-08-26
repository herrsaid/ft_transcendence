
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Messages } from "./Message.entity";
import { User } from "src/entities/user/user.entity";

@Entity()
export default class Groups{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string
    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
    @OneToMany(() => Messages, (messages) => messages.group)
    messages: Messages[]
}