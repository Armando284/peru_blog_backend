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
import { CampaignDTO } from './dto/campaign-dto';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignService: CampaignsService) {}

  @Get('/')
  async getCampaigns(@Res() res) {
    const campaigns = await this.campaignService.getAll();
    if (!campaigns)
      throw new NotFoundException('There are no campaigns on the database');
    return res.status(HttpStatus.OK).json({
      campaigns,
    });
  }

  @Get('/:campaignID')
  async getCampaign(@Res() res, @Param('campaignID') campaignID) {
    const campaign = await this.campaignService.getOne(campaignID);
    if (!campaign) throw new NotFoundException('Campaign does not exist');
    return res.status(HttpStatus.OK).json({ campaign });
  }

  @Post('/create')
  async create(@Res() res, @Body() campaignDto: CampaignDTO) {
    const campaign = await this.campaignService.create(campaignDto);
    return res.status(HttpStatus.OK).json({
      message: 'Campaign created succesfully',
      campaign,
    });
  }

  @Put('/update')
  async update(
    @Res() res,
    @Body() campaignDto: CampaignDTO,
    @Query('campaignID') campaignID,
  ) {
    const campaign = await this.campaignService.update(campaignID, campaignDto);
    if (!campaign) throw new NotFoundException('Campaign does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Campaign updated succesfully',
      campaign,
    });
  }

  @Delete('/delete')
  async delete(@Res() res, @Query('campaignID') campaignID) {
    const campaign = await this.campaignService.delete(campaignID);
    if (!campaign) throw new NotFoundException('Campaign does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Campaign deleted succesfully',
      campaign,
    });
  }
}
