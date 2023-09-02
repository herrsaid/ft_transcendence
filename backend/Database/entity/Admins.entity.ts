import { User } from "src/entities/user/user.entity";
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admins{
    @PrimaryGeneratedColumn()
    id:number
    @ManyToMany(() =>User, (admin) => admin.admin)
    @JoinTable()
    admins:User[]
}