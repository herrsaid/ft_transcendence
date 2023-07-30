import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}