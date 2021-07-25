import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rol {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type RolDocument = Rol & Document;

export const RolSchema = SchemaFactory.createForClass(Rol);
