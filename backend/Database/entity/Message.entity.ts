import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Groups from "./Groups.entity";

@Entity()
export class Messages{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    src: number
    @Column()
    dst: number
    @Column()
    content: string
    @ManyToOne(() => Groups, (group) => group.messages)
    group:Groups
}