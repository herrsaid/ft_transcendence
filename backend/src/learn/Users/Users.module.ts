import { Module } from '@nestjs/common';
import { UserController } from './Users.controller';
import { UsersService } from './Users.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
