import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>)
    {}

    async findOne(id:number)
    {
        return await this.userRepo.findOne({where:{id:id}})
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



    // async createImage() {
    //     return this.imageRepository.save(image);
    //   }
    
    //   async getImage(id: number) {
    //     return this.userRepo.
    //   }
}
