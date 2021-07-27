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
    return campaign;
  }

  @Post('/create')
  async create(@Res() res, @Body() campaignDto: CampaignDTO) {
    const campaign = await this.campaignService.create(campaignDto);
    return res.status(HttpStatus.OK).json({
      message: 'Cmapaign created succesfully',
      campaign,
    });
  }
}
