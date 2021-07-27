import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { AnnouncementsModule } from './announcements/announcements.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/peru-blog'),
    UsersModule,
    RolesModule,
    CampaignsModule,
    AnnouncementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
