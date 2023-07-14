import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Achievevement } from "./achievevements.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true, nullable: false})
    username:string;


    @Column({unique: true, nullable: false})
    email:string;

    @Column({default:"/avatar.png"})
    profile_img:string;

    @Column({default:"beginner"})
    rank:string;

    @Column({default:false})
    status:boolean;

    @Column({default:"morroco"})
    location:string;

    @Column({default:0})
    totalgame:number;

    @Column({default:0})
    wins:number;


    @Column({default:0})
    loss:number;

    @Column({default:0})
    score:number;


    // @OneToMany(type => Achievevement, achievevement => achievevement.user)
    // achievevements: Achievevement[];

}