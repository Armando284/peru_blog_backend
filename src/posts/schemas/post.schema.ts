import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BlogPost {
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
}

export type BlogPostDocument = BlogPost & Document;

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
