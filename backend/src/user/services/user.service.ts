import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, updateAvatar, updateAvatar_bol, updateGameStatus, updateImage, updateStatus, updateUsername } from '../dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Not, Repository } from 'typeorm';
import { Observable, from, of, switchMap } from 'rxjs';
import { FriendRequest } from 'src/entities/friend/friend-request.entity';
import { FriendRequest_Interface, FriendRequest_Status } from 'src/entities/friend/interfaces/friend-request.interface';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>
    ,
    @InjectRepository(FriendRequest) private readonly FriendRequestRepo : Repository<FriendRequest>)
    {}





    async getUsersSearch(alias:string)
    {
        try
        {
            return this.userRepo.createQueryBuilder(alias);
        }
        catch{
            throw new NotFoundException(); 
        }
        
    }

    async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
        try
        {
            return this.userRepo.update(userId, {
                twoFactorAuthenticationSecret: secret
              });
        }
        catch
        {
            throw new BadRequestException(); 
        }
        
    }


    async turnOnTwoFactorAuthentication(userId: number) {
        try
        {
            return this.userRepo.update(userId, {
                isTwoFactorAuthenticationEnabled: true
              });
        }
        catch{
            throw new BadRequestException(); 
        }
        
    }


    async turnOffTwoFactorAuthentication(userId: number) {
        try
        {
            return this.userRepo.update(userId, {
                isTwoFactorAuthenticationEnabled: false
              });
        }
        catch{
            throw new BadRequestException(); 
        }
        
    }

    async findOne(id:number)
    {
        try
        {
            return await this.userRepo.findOne({where:{id:id}})
        }
        catch
        {
            throw new NotFoundException(); 
        }
        
    }


    findOneById(id:number): Observable<User>
    {
        try
        {
            return  from(this.userRepo.findOne({where:{id:id}}))
        }
        catch
        {
            throw new NotFoundException(); 
        }
        
    }


    async findOneByUsername(username:string)
    {
        try
        {
            return await this.userRepo.findOne({where:{username:username}})
        }
        catch
        {
            throw new NotFoundException(); 
        }
        
    }


    async findAllUserNotMe(id:number)
    {
        try
        {
            return await this.userRepo.find( { where: {id: Not(id)}})
        }
        catch
        {
            throw new NotFoundException();
        }
        
    }


    async findUserByEmail(email:string)
    {
        try
        {
            return await this.userRepo.findOne({where:{email:email}})
        }
        catch{
            throw new NotFoundException();
        }
    }

    async create(createUserDto:CreateUserDto)
    {
        try
        {
            const user = await this.userRepo.create(createUserDto);
            return await this.userRepo.save(user);
        }
        catch{
            throw new BadRequestException();
        }
    }


    async updateUsername(id:number, updateUsername: updateUsername)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}});
            Object.assign(user, updateUsername);
            return await this.userRepo.save(user);
        }
        catch{
            throw new BadRequestException();
        }
    }

    async updateStatus(username:string, updateStatus: updateStatus)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{username:username}});
            Object.assign(user, updateStatus);
            return await this.userRepo.save(user);
        }
        catch{
            throw new BadRequestException();
        }
        
    }


    async updateGameStatus(username:string, updateGameStatus: updateGameStatus)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{username:username}});
            Object.assign(user, updateGameStatus);
            return await this.userRepo.save(user);
        }
        catch{
            throw new BadRequestException();
        }
        
    }


    async updateAvatar(id:number, updateAvatar: updateAvatar)
    {
        try
        {
            this.update_is_profile_img_updated(id, {"is_profile_img_updated" : true})
            const user = await this.userRepo.findOne({where:{id:id}});
            Object.assign(user, updateAvatar);
            return await this.userRepo.save(user);
        }
        catch
        {
            throw new BadRequestException();
        }        
    }





    async updateImage(id:number, updateImage: updateImage)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}});
            Object.assign(user, updateImage);
            return await this.userRepo.save(user);
        }
        catch
        {
            throw new BadRequestException();
        }        
    }


    hasRequestBeenSentOrRecieved(creator:User, receiver:User)
    {
        try
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
        catch{
            throw new BadRequestException();
        }
    }


    //block user
    blockUser(receiverId: number, creator: User)
    {
        try
        {
            if (receiverId === creator.id)
                return of({error: 'It is not possible to block yourself'});
            
            return this.findOneById(receiverId).pipe(
    
                switchMap((receiver:User) => {
                    return this.hasRequestBeenSentOrRecieved(creator, receiver).pipe(
                        switchMap((hasRequestBeenSentOrRecieved:boolean) => {
    
                            let friendRequest: FriendRequest_Interface = {
                                creator,
                                receiver,
                                status: 'blocked'
                            }
    
                            return from(this.FriendRequestRepo.save(friendRequest));
                        })
                    );
                }),
            );

        }
        catch{
            throw new BadRequestException();
        }
        
    }


    //block status


    getBlockStatus(receiverId:number, currentUser:User){
        try
        {
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
                    if (friendRequest?.receiver.id === currentUser.id && friendRequest?.status == "blocked")
                    {
                        return of({status: 'waiting-for-unblock', id:friendRequest?.id});
                    }
                    return of({status: friendRequest?.status || 'not-sent', id: friendRequest?.id});
                }),
    
                );

        }
        catch{
            throw new BadRequestException();
        }
    }









    sendFriendRequest(receiverId: number, creator: User)
    {
        try
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
        catch{
            throw new BadRequestException();
        }
        
    }


    getFriendRequestStatus(receiverId:number, currentUser:User){
        try
        {
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
                    if (friendRequest?.receiver.id === currentUser.id && friendRequest?.status != "accepted" && friendRequest?.status != "blocked")
                    {
                        return of({status: 'waiting-for-current-user-response', id:friendRequest?.id});
                    }
                    else if (friendRequest?.receiver.id === currentUser.id && friendRequest?.status == "blocked")
                    {
                        return of({status: 'waiting-for-unblock', id:friendRequest?.id});
                    }
                    return of({status: friendRequest?.status || 'not-sent', id: friendRequest?.id});
                }),
    
                );

        }
        catch{
            throw new BadRequestException();
        }
    }



    getFriendRequestUserById(friendRequestId:number)
    {
        try{

            return from(this.FriendRequestRepo.findOne({
                where: [{id: friendRequestId}]
            }))
        }
        catch{
            throw new BadRequestException();
        }
    }

    respondToFriendRequest(friendRequestId:number, statusResponse: FriendRequest_Status)
    {
        try
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
        catch{
            throw new BadRequestException();
        }
    }




    getFriendRequest(currentUser:User)
    {
        try
        {
            return from(this.FriendRequestRepo.find({
                where :[{receiver:currentUser}]
            }))

        }
        catch{
            throw new BadRequestException();
        }
    }


    async update_is_profile_img_updated(id:number, updateAvatar_bol: updateAvatar_bol)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}});
            Object.assign(user, updateAvatar_bol);
            return await this.userRepo.save(user);
        }
        catch
        {
            throw new BadRequestException();
        }
        
    }


    async getAllMyFriends(currentUser: User): Promise<User[]> {
        try
        {
            const users = await this.userRepo
          .createQueryBuilder('user')
          .leftJoin(
            FriendRequest,
            'friendRequest',
            'friendRequest.receiverId = user.id AND friendRequest.status = :status OR friendRequest.creatorId = user.id AND friendRequest.status = :status',
            { status: 'accepted' }
          )
          .where('user.id != :currentUserId', { currentUserId: currentUser.id })
          .andWhere('(friendRequest.creatorId = :currentUserId OR friendRequest.receiverId = :currentUserId)', { currentUserId: currentUser.id })
          .getMany();
    
            return users;
        }
        catch{
            throw new BadRequestException();
        }
      }



      async deleteFriendRequest(id: number){
        try
        {
            const FriendRequest = await this.FriendRequestRepo.findOne({where:{id:id}});
            if (!FriendRequest) {
                throw new NotFoundException(`FriendRequest with id ${id} not found`);
            }
    
            await this.FriendRequestRepo.remove(FriendRequest);
        }
        catch
        {
            throw new NotFoundException(`FriendRequest with id ${id} not found`);
        }
        
      }
      async myGroups(id:number)
      {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}, relations:{groupusers:true}, select:{id :true}});
            console.log(user.groupusers[0].id)
        }
        catch{
            throw new BadRequestException();
        }
      }

      getCookieForLogOut()
      {
        return `access_token=; HttpOnly; Path=/; Max-Age=0`;
      }
      async checkFileExists(path: string): Promise<boolean> {
        try{
            const fs = require('fs').promises;
            try {
              await fs.access(path);
              return true;
            } catch (error) {
              return false;
            }

        }
        catch{
            throw new BadRequestException();
        }
      }

}
