import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getOne(userID: string): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(userID: string, createUserDto: CreateUserDto): Promise<User> {
    createUserDto.updatedAt = new Date();
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async delete(userID: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userID);
    return deletedUser;
  }
}
