import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { CampaignDTO } from './dto/campaign-dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async getAll(): Promise<Campaign[]> {
    const campaigns = await this.campaignModel.find().exec();
    return campaigns;
  }

  async getOne(campaignID: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findById(campaignID).exec();
    return campaign;
  }

  async create(campaignDto: CampaignDTO): Promise<Campaign> {
    const createdCampaign = new this.campaignModel(campaignDto);
    return await createdCampaign.save();
  }

  async update(
    campaignID: string,
    campaignDto: CampaignDTO,
  ): Promise<Campaign> {
    campaignDto.updatedAt = new Date();
    const updatedCampaign = await this.campaignModel.findByIdAndUpdate(
      campaignID,
      campaignDto,
      { new: true },
    );
    return updatedCampaign;
  }

  async delete(campaignID: string): Promise<Campaign> {
    const deletedCampaign = await this.campaignModel.findByIdAndDelete(
      campaignID,
    );
    return deletedCampaign;
  }
}
