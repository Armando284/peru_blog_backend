import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getUsers(@Res() res) {
    const users = await this.userService.getAll();
    if (!users)
      throw new NotFoundException('There are no users on the database');
    return res.status(HttpStatus.OK).json({
      users,
    });
  }

  @Get('/:userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getOne(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      user,
    });
  }

  @Post('/create')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User succesfully created',
      user,
    });
  }

  @Put('/update')
  async updateUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
    @Query('userID') userID,
  ) {
    const updatedUser = await this.userService.update(userID, createUserDto);
    if (!updatedUser) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User updated succesfully',
      updatedUser,
    });
  }

  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const deletedUser = await this.userService.delete(userID);
    if (!deletedUser) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User deleted succesfully',
      deletedUser,
    });
  }
}
