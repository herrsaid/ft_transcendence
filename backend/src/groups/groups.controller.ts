import { Body, Controller, ForbiddenException, Get, NotAcceptableException, NotFoundException, Param, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import Groups from 'Database/entity/Groups.entity';
import { GroupsService } from 'Database/services/groups/groups.service';
import { UserService } from 'src/user/services/user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GroupusersService } from 'Database/services/groupusers/groupusers.service';
import GroupUsers from 'Database/entity/GroupUsers.entity';
import {hashPassword, compare} from '../hash/hash'
import { request } from 'http';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GridFSBucket } from 'typeorm';

@Controller('groups')
export class GroupsController {
    constructor(private readonly GroupService:GroupsService, private readonly User:UserService,
        private readonly GroupUsersService:GroupusersService,
        private readonly groupusers:GroupusersService,
        private eventEmitter: EventEmitter2){}
        @UseGuards(AuthGuard)
        @Post('create')
        async create(@Req() request, @Body() Group)
        {
            const user_id = request['user'];
            if (Group.type == 'protected')
                Group.password = await hashPassword(Group.password);
            const group  = this.GroupService.create_group(Group, user_id.id);
        }
        @UseGuards(AuthGuard)
        @Get('join')
        async join(@Req() request,@Query() params)
        {
            const user_id = request['user'].id;
            try
            {
                if (await this.GroupUsersService.isUserInGroup(user_id, params.id) == false)
                {
                    const group = await this.GroupService.findOne(params.id);
                    const user = await this.User.findOne(user_id);
                    const member = new GroupUsers();
                    member.user = user;
                    member.group = group;
                    const m = await this.GroupUsersService.create(member);
                    group.members.push(m);
                    group.size = group.size + 1;
                    this.GroupService.save(group);
                    return 'created'
                }
            }
            catch(error)
            {
                throw NotFoundException;
            }
        }
        @UseGuards(AuthGuard)
        @Post('protectedjoin')
        async protectedjoin(@Req() request,@Body() info)
        {
            try{

                const user_id = request['user'].id;
                if (await this.GroupUsersService.isUserInGroup(user_id, info.id) == false)
                {
                    const hashpasswd = await this.GroupService.getPassword(info.id);
                    if (await compare(info.password, hashpasswd))
                    {
                        const group = await this.GroupService.findOne(info.id);
                        const user = await this.User.findOne(user_id);
                        const member = new GroupUsers();
                        member.user = user;
                        member.group = group;
                        const m = await this.GroupUsersService.create(member);
                        group.members.push(m);
                    }
                    throw new UnauthorizedException();
                }
            }
            catch(error)
            {
                throw new UnauthorizedException();
            }
        }
        @UseGuards(AuthGuard)
        @Get('search')
        async search(@Query() Param)
        {
            if (!Param.value)
                return [];
            const res = await this.GroupService.search(Param.value)
            return res;
        }
        @UseGuards(AuthGuard)
        @Get('mygroups')
        async myGroups(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            const usergroup = await this.groupusers.findGroup(user_id);
            return(usergroup)
        }
        @UseGuards(AuthGuard)
        @Get('messages')
        async group_messages(@Query() params)
        {
            const group = await this.GroupService.findOne_messages(params.id);
            return (group.messages);
        }
        @UseGuards(AuthGuard)
        @Get('members')
        async members(@Query() param)
        {
            try{
                const members = await this.groupusers.findMembers(param.id);
                return members;
            }
            catch(error)
            {
                console.log(error);
            }
        }
        @UseGuards(AuthGuard)
        @Get('leave')
        async leave(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            this.GroupUsersService.remove(user_id, params.id)
        }
        @UseGuards(AuthGuard)
        @Get('kick')
        async kick(@Req() request, @Query() parmas)
        {
            const user_id = request['user'].id;
            if((await this.GroupUsersService.is_admin(user_id, parmas.id)) != "user"
                && (await this.GroupUsersService.is_admin(parmas.toremove, parmas.id)) != "owner")
            {
                this.eventEmitter.emit('status', {user:parmas.toremove, action:"out"})
                this.GroupUsersService.remove(parmas.toremove, parmas.id)
                return 'deleted'
            }
            else 
                throw new UnauthorizedException();
        }
        @UseGuards(AuthGuard)
        @Get('mute')
        async mute(@Req() request, @Query() parmas)
        {
            const user_id = request['user'].id;
            if((await this.GroupUsersService.is_admin(user_id, parmas.id)) != "user"
                && (await this.GroupUsersService.is_admin(parmas.tomute, parmas.id)) != "owner")
            {
                this.GroupUsersService.mute(parmas.id, parmas.tomute,parmas.time)
                return 'muted'
            }
            else 
                throw new UnauthorizedException();
        }
        @UseGuards(AuthGuard)
        @Get('ban')
        async ban(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            if((await this.GroupUsersService.is_admin(user_id, params.id)) != "user"
                && (await this.GroupUsersService.is_admin(params.toban, params.id)) != "owner")
            {
                this.eventEmitter.emit('status', {user:params.to_ban, action:"out"})
                this.GroupUsersService.ban(params.id, params.toban)
            }
            else 
                throw NotAcceptableException;
        }
        @UseGuards(AuthGuard)
        @Get('newadmin')
        async newadmin(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            if((await this.GroupUsersService.is_admin(user_id, params.id)) != "user"
                && (await this.GroupUsersService.is_admin(params.new, params.id)) != "owner")
            {
                this.GroupUsersService.new(params.id, params.new)
            }
            else 
                throw new UnauthorizedException();
        }
        @UseGuards(AuthGuard)
        @Get('status')
        async status(@Req() request, @Query() params)
        {
            const user_id = request['user'].id;
            try {
                const status = await this.GroupUsersService.status(user_id, params.id)
                return status;
            } catch {
                throw new UnauthorizedException();
            }
        }
        @UseGuards(AuthGuard)
        @Get('addmember')
        async addmember(@Req() request, @Query() params)
        {
            const user = await this.User.findOneByUsername(params.username);
            const user_id = user.id;
            try
            {
                if (await this.GroupUsersService.isUserInGroup(user_id, params.id) == false)
                {
                    const group = await this.GroupService.findOne(params.id);
                    const user = await this.User.findOne(user_id);
                    const member = new GroupUsers();
                    member.user = user;
                    member.group = group;
                    const m = await this.GroupUsersService.create(member);
                    group.members.push(m);
                    group.size = group.size + 1;
                    this.GroupService.save(group);
                    return 'created'
                }
            }
            catch(error)
            {
                throw NotFoundException;
            }
        }
}
