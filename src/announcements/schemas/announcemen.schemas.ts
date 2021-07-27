import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Announcement {
  @Prop({ required: true })
  authorID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: [];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.parse('2999-12-31') })
  destroyedAt: Date;
}

export type AnnouncementDocument = Announcement & Document;

export const AnnouncementeSchema = SchemaFactory.createForClass(Announcement);
