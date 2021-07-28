import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { AnnouncementDTO } from './dto/announcement-dto';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from './schemas/announcemen.schemas';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private announcementService: AnnouncementsService) {}

  @Get('/')
  async getAnnouncements(@Res() res): Promise<Announcement[]> {
    const announcements = await this.announcementService.getAll();
    if (!announcements)
      throw new NotFoundException('There are no announcements on the database');
    return res.status(HttpStatus.OK).json({ announcements });
  }

  @Get('/:announcementID')
  async getAnnouncement(
    @Res() res,
    @Param('announcementID') announcementID,
  ): Promise<Announcement> {
    const announcement = await this.announcementService.getOne(announcementID);
    if (!announcement)
      throw new NotFoundException('Announcement does not exist');
    return res.status(HttpStatus.OK).json({ announcement });
  }

  @Post('/create')
  async create(
    @Res() res,
    @Body() announcementDto: AnnouncementDTO,
  ): Promise<Announcement> {
    const announcement = await this.announcementService.create(announcementDto);
    return res.status(HttpStatus.OK).json({
      message: 'Announcement created succesfully',
      announcement,
    });
  }

  @Put('/update')
  async update(
    @Res() res,
    @Body() announcementDto: AnnouncementDTO,
    @Query('announcementID') announcementID,
  ): Promise<Announcement> {
    const announcement = await this.announcementService.update(
      announcementID,
      announcementDto,
    );
    if (!announcement)
      throw new NotFoundException('Announcement does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Announcement updated succesfully',
      announcement,
    });
  }

  @Delete('/delete')
  async delete(
    @Res() res,
    @Query('announcementID') announcementID,
  ): Promise<Announcement> {
    const announcement = await this.announcementService.delete(announcementID);
    if (!announcementID)
      throw new NotFoundException('Announcement does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Announcement deleted succesfully',
      announcement,
    });
  }
}
