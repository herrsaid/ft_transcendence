import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Messages } from "./Message.entity";

@Entity()
export default class Conversation {
    @PrimaryGeneratedColumn()
    id:number;
    // @OneToMany()
    // Messages: Messages[];
}