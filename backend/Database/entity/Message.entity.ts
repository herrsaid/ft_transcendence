import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Messages{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    sender_id: number
    @Column()
    reciver_id: number
    @Column()
    content: string
}