import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FriendRequest } from "../friend/friend-request.entity";
import Groups from "Database/entity/Groups.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true, nullable: false})
    username:string;


    @Column({unique: true, nullable: false})
    email:string;

    @Column({ nullable: true })
    twoFactorAuthenticationSecret?: string;


    @Column({ default: false })
    isTwoFactorAuthenticationEnabled: boolean;


    @Column({ default: false })
    is_profile_img_updated: boolean;

    
    @Column({default:"/avatar.png"})
    profile_img:string;

    @Column({default:"beginner"})
    rank:string;

    @Column({default:false})
    status:boolean;


    @Column({default:false})
    isInGame:boolean;

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


    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.creator)
    sentFriendRequest: FriendRequest[];


    @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
    receivedFriendRequest: FriendRequest[];
    @ManyToMany(() => Groups, (group) =>group.users)
    groups: Groups

}