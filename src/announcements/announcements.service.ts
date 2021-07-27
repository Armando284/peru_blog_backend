import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementDocument,
} from './schemas/announcemen.schemas';
import { AnnouncementDTO } from './dto/announcement-dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<AnnouncementDTO>,
  ) {}

  async getAll(): Promise<Announcement[]> {
    const announcements = await this.announcementModel.find().exec();
    return announcements;
  }

  async getOne(announcementID: string): Promise<Announcement> {
    const announcement = await this.announcementModel
      .findById(announcementID)
      .exec();
    return announcement;
  }

  async create(announcementDto: AnnouncementDTO): Promise<Announcement> {
    const announcement = new this.announcementModel(announcementDto);
    return await announcement.save();
  }

  async update(
    announcementID: string,
    announcementDto: AnnouncementDTO,
  ): Promise<Announcement> {
    announcementDto.updatedAt = new Date();
    const announcement = await this.announcementModel.findByIdAndUpdate(
      announcementID,
      announcementDto,
      { new: true },
    );
    return announcement;
  }

  async delete(announcementID: string): Promise<Announcement> {
    const announcement = await this.announcementModel.findByIdAndDelete(
      announcementID,
    );
    return announcement;
  }
}
