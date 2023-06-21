import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true, nullable: false})
    username:string;


    @Column({unique: true, nullable: false})
    email:string;

    // @Column()
    // profile_img:string;

    // @Column()
    // rank:string;

    // @Column({default:false})
    // status:boolean;

    // @Column()
    // location:string;

    // @Column()
    // totalgame:string;

    // @Column()
    // wins:number;


    // @Column()
    // loss:number;

    // @Column()
    // score:number;


}