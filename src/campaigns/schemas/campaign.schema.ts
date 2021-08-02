import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Campaign {
  @Prop({ required: true })
  authorID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.parse('2999-12-31') })
  destroyedAt: Date;
}

export type CampaignDocument = Campaign & Document;

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
