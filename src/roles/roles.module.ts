import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from './schemas/rol.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
