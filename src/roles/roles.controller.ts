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
  Query,
  NotFoundException,
} from '@nestjs/common';
import { RolDTO } from './dto/role-dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolsService: RolesService) {}

  @Get('/')
  async getRols(@Res() res) {
    const rols = await this.rolsService.getAll();
    if (!rols) throw new NotFoundException('There are no rols on the database');
    return res.status(HttpStatus.OK).json({
      rols,
    });
  }

  @Get('/:rolID')
  async getRol(@Res() res, @Param('rolID') rolID) {
    const rol = await this.rolsService.getOne(rolID);
    if (!rol) throw new NotFoundException('Rol does not exist');
    return res.status(HttpStatus.OK).json({
      rol,
    });
  }

  @Post('/create')
  async createRol(@Res() res, @Body() rolDto: RolDTO) {
    const createdRol = await this.rolsService.create(rolDto);
    return res.status(HttpStatus.OK).json({
      message: 'Rol created succesfully',
      createdRol,
    });
  }

  @Put('/update')
  async updateRol(@Res() res, @Body() rolDto: RolDTO, @Query('rolID') rolID) {
    const updatedRol = await this.rolsService.update(rolID, rolDto);
    if (!updatedRol) throw new NotFoundException('Rol does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Rol updated succesfully',
      updatedRol,
    });
  }

  @Delete('/delete')
  async deleteRol(@Res() res, @Query('rolID') rolID) {
    const deletedRol = await this.rolsService.delete(rolID);
    if (!deletedRol) throw new NotFoundException('Rol does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Rol deleted succesfully',
      deletedRol,
    });
  }
}
