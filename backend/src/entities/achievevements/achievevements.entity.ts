import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievevement{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column({default:"/a.jpg"})
    image:string;
}