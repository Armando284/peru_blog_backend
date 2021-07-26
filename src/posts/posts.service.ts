import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost, BlogPostDocument } from './schemas/post.schema';
import { PostDTO } from './dto/post-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(BlogPost.name) private postModel: Model<BlogPostDocument>,
  ) {}
}
