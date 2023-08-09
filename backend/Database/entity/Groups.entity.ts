
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Messages } from "./Message.entity";

@Entity()
export default class Groups{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
//     @OneToMany(()=> Messages, messages => messages.Group, { cascade: true })
//     messages:Messages[];
}