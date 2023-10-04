import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
            if (alias)
                return this.userRepo.createQueryBuilder(alias);
        }
        catch{
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
        }
        
    }


    async turnOnTwoFactorAuthentication(userId: number) {
        try
        {
            if (userId)
            {
                return this.userRepo.update(userId, {
                    isTwoFactorAuthenticationEnabled: true
                  });
            }
        }
        catch{
            throw new UnauthorizedException(); 
        }
        
    }


    async turnOffTwoFactorAuthentication(userId: number) {
        try
        {
            if (userId)
            {
                return this.userRepo.update(userId, {
                    isTwoFactorAuthenticationEnabled: false
                  });
            }
        }
        catch{
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
        }
        
    }


    async findOneByUsername(username:string)
    {
        try
        {
            if (username)
                return await this.userRepo.findOne({where:{username:username}})
        }
        catch
        {
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
        }
        
    }


    async findUserByEmail(email:string)
    {
        try
        {
            if (email)
                return await this.userRepo.findOne({where:{email:email}})
        }
        catch{
            throw new UnauthorizedException();
        }
    }

    async create(createUserDto:CreateUserDto)
    {
        try
        {
            const user = await this.userRepo.create(createUserDto);
            if (user)
                return await this.userRepo.save(user);
        }
        catch{
            throw new UnauthorizedException();
        }
    }


    async updateUsername(id:number, updateUsername: updateUsername)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}});
            if (user)
            {
                Object.assign(user, updateUsername);
                return await this.userRepo.save(user); 
            }
        }
        catch{
            throw new UnauthorizedException();
        }
    }

    async updateStatus(username:string, updateStatus: updateStatus)
    {
        try
        {
            if (username)
            {
                const user = await this.userRepo.findOne({where:{username:username}});
                if (user)
                {
                    Object.assign(user, updateStatus);
                    return await this.userRepo.save(user);
                }

            }
        }
        catch{
            throw new UnauthorizedException();
        }
        
    }


    async updateGameStatus(username:string, updateGameStatus: updateGameStatus)
    {
        try
        {
            if (username)
            {
                const user = await this.userRepo.findOne({where:{username:username}});
                if (user)
                {
                    Object.assign(user, updateGameStatus);
                    return await this.userRepo.save(user);
                }

            }
        }
        catch{
            throw new UnauthorizedException();
        }
        
    }


    async updateAvatar(id:number, updateAvatar: updateAvatar)
    {
        try
        {
            this.update_is_profile_img_updated(id, {"is_profile_img_updated" : true})
            const user = await this.userRepo.findOne({where:{id:id}});
            if (user)
            {
                Object.assign(user, updateAvatar);
                return await this.userRepo.save(user);
            }
        }
        catch
        {
            throw new UnauthorizedException();
        }        
    }





    async updateImage(id:number, updateImage: updateImage)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}});
            if (user)
            {
                Object.assign(user, updateImage);
                return await this.userRepo.save(user);
            }
        }
        catch
        {
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
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
                    if (hasRequestBeenSentOrRecieved) return of({error:'already blocked!'})

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
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
        }
    }




    getFriendRequest(currentUser:User)
    {
        try
        {
            if (currentUser)
            {
                return from(this.FriendRequestRepo.find({
                    where :[{receiver:currentUser}]
                }))
            }

        }
        catch{
            throw new UnauthorizedException();
        }
    }


    async update_is_profile_img_updated(id:number, updateAvatar_bol: updateAvatar_bol)
    {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}});
            if (user)
            {
                Object.assign(user, updateAvatar_bol);
                return await this.userRepo.save(user);
            }
        }
        catch
        {
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
        }
      }



      async deleteFriendRequest(id: number){
        try
        {
            const FriendRequest = await this.FriendRequestRepo.findOne({where:{id:id}, relations:["receiver","creator"]});
            if (!FriendRequest) {
                console.log('FriendRequest with not found')
            }
            console.log('friend req', FriendRequest);
            await this.FriendRequestRepo.remove(FriendRequest);
        }
        catch
        {
            throw new UnauthorizedException();
        }
        
      }
      async myGroups(id:number)
      {
        try
        {
            const user = await this.userRepo.findOne({where:{id:id}, relations:{groupusers:true}, select:{id :true}});
            if (user)
                console.log(user.groupusers[0].id)
        }
        catch{
            throw new UnauthorizedException();
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
            throw new UnauthorizedException();
        }
      }

}
