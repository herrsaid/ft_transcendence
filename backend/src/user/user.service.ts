import { Injectable } from '@nestjs/common';
import { CreateUserDto, updateAvatar, updateUsername } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Observable, from, of, switchMap } from 'rxjs';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { FriendRequest_Interface, FriendRequest_Status } from 'src/entities/friend-request.interface';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>
    ,
    @InjectRepository(FriendRequest) private readonly FriendRequestRepo : Repository<FriendRequest>)
    {}

    async findOne(id:number)
    {
        return await this.userRepo.findOne({where:{id:id}})
    }


    findOneById(id:number): Observable<User>
    {
        return  from(this.userRepo.findOne({where:{id:id}}))
    }


    async findOneByUsername(username:string)
    {
        return await this.userRepo.findOne({where:{username:username}})
    }


    async findAllFriends(id:number)
    {
        return await this.userRepo.find( { where: {id: Not(id)}})
    }


    async findUserByEmail(email:string)
    {
        return await this.userRepo.findOne({where:{email:email}})
    }

    async create(createUserDto:CreateUserDto)
    {
        const user = await this.userRepo.create(createUserDto);
        return await this.userRepo.save(user);
    }


    async updateUsername(id:number, updateUsername: updateUsername)
    {
        const user = await this.userRepo.findOne({where:{id:id}});
        Object.assign(user, updateUsername);
        return await this.userRepo.save(user);
    }


    async updateAvatar(id:number, updateAvatar: updateAvatar)
    {
        const user = await this.userRepo.findOne({where:{id:id}});
        Object.assign(user, updateAvatar);
        return await this.userRepo.save(user);
    }


    hasRequestBeenSentOrRecieved(creator:User, receiver:User)
    {
        return from(this.FriendRequestRepo.findOne({
            where: [
                {creator, receiver},
                {creator: receiver, receiver: creator},
            ]
        })).pipe(
            switchMap((friendRequest: FriendRequest_Interface) => {
                if (!friendRequest) return of(false);
                return of(true);
            })
        );
    }

    sendFriendRequest(receiverId: number, creator: User)
    {
        if (receiverId === creator.id)
        return of({error: 'It is not possible to add yourself'});
        
        return this.findOneById(receiverId).pipe(

            switchMap((receiver:User) => {
                return this.hasRequestBeenSentOrRecieved(creator, receiver).pipe(
                    switchMap((hasRequestBeenSentOrRecieved:boolean) => {
                        if (hasRequestBeenSentOrRecieved) return of({error:'A Friend request has already been sent of received to your account!'})

                        let friendRequest: FriendRequest_Interface = {
                            creator,
                            receiver,
                            status: 'pending'
                        }

                        return from(this.FriendRequestRepo.save(friendRequest));
                    })
                );
            }),
        );
        
    }


    getFriendRequestStatus(receiverId:number, currentUser:User){
        return this.findOneById(receiverId).pipe(
            switchMap((receiver:User) => {
                return from(this.FriendRequestRepo.findOne({
                    where: [
                        {
                            creator: currentUser,
                            receiver: receiver,
                        },
                        {
                            creator: receiver,
                            receiver: currentUser,
                        },
                    ],
                    relations: ['creator','receiver']

                }));
            }),

            switchMap((friendRequest: FriendRequest_Interface) => {
                if (friendRequest?.receiver.id === currentUser.id)
                {
                    return of({status: 'waiting-for-current-user-response'});
                }
                return of({status: friendRequest?.status || 'not-sent'});
            }),

            );
    }



    getFriendRequestUserById(friendRequestId:number)
    {
        return from(this.FriendRequestRepo.findOne({
            where: [{id: friendRequestId}]
        }))
    }

    respondToFriendRequest(friendRequestId:number, statusResponse: FriendRequest_Status)
    {
        return this.getFriendRequestUserById(friendRequestId).pipe(
            switchMap((friendRequest: FriendRequest_Interface) => {
                return from(this.FriendRequestRepo.save({
                    ...friendRequest,
                    status: statusResponse,
                }))
            }),
        );
    }


    getFriendRequest(currentUser:User)
    {
        return from(this.FriendRequestRepo.find({
            where :[{receiver:currentUser}]
        }))
    }

}
