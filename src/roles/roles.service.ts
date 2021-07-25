import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Rol, RolDocument } from './schemas/rol.schema';
import { RolDTO } from './dto/role-dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Rol.name) private rolModel: Model<RolDocument>) {}

  async getAll(): Promise<Rol[]> {
    const rols = await this.rolModel.find().exec();
    return rols;
  }

  async getOne(rolID: string): Promise<Rol> {
    const rol = await this.rolModel.findById(rolID).exec();
    return rol;
  }

  async create(rolDto: RolDTO): Promise<Rol> {
    const createdRol = new this.rolModel(rolDto);
    return await createdRol.save();
  }

  async update(rolID: string, rolDto: RolDTO): Promise<Rol> {
    rolDto.updatedAt = new Date();
    const updatedRol = await this.rolModel.findByIdAndUpdate(rolID, rolDto, {
      new: true,
    });
    return updatedRol;
  }

  async delete(rolID: string): Promise<Rol> {
    const deletedRol = await this.rolModel.findByIdAndDelete(rolID);
    return deletedRol;
  }
}
