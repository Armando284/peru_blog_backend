import { Module } from '@nestjs/common';
import { AnnouncementsController } from './announcements.controller';
import { AnnouncementsService } from './announcements.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementeSchema,
} from './schemas/announcemen.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementeSchema },
    ]),
  ],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
