import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return '';
  }

  @Post('/create')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'received',
      user: user,
    });
  }
}
