import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/peru-blog'),
    UsersModule,
    RolesModule,
    PostsModule,
    AdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
