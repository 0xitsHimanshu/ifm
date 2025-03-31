import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Marketplace, MarketplaceDocument } from './marketplace.schema';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectModel(Marketplace.name) private marketplaceModel: Model<MarketplaceDocument>,
  ) {}

  async create(createMarketplaceDto: CreateMarketplaceDto): Promise<Marketplace> {
    const createdMarketplace = new this.marketplaceModel({
      ...createMarketplaceDto,
      analytics: {
        views: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
      },
    });
    return createdMarketplace.save();
  }

  async findAll(query: any = {}): Promise<Marketplace[]> {
    return this.marketplaceModel.find(query).exec();
  }

  async findOne(id: string): Promise<Marketplace> {
    const marketplace = await this.marketplaceModel.findById(id).exec();
    if (!marketplace) {
      throw new NotFoundException(`Marketplace item with ID ${id} not found`);
    }
    return marketplace;
  }

  async update(id: string, updateMarketplaceDto: UpdateMarketplaceDto): Promise<Marketplace> {
    const updatedMarketplace = await this.marketplaceModel
      .findByIdAndUpdate(id, updateMarketplaceDto, { new: true })
      .exec();
    if (!updatedMarketplace) {
      throw new NotFoundException(`Marketplace item with ID ${id} not found`);
    }
    return updatedMarketplace;
  }

  async remove(id: string): Promise<Marketplace> {
    const deletedMarketplace = await this.marketplaceModel.findByIdAndDelete(id).exec();
    if (!deletedMarketplace) {
      throw new NotFoundException(`Marketplace item with ID ${id} not found`);
    }
    return deletedMarketplace;
  }

  async findBySellerId(sellerId: string): Promise<Marketplace[]> {
    return this.marketplaceModel.find({ sellerId }).exec();
  }

  async findByCategory(category: string): Promise<Marketplace[]> {
    return this.marketplaceModel.find({ category, status: 'active' }).exec();
  }

  async findByCampaignId(campaignId: string): Promise<Marketplace[]> {
    return this.marketplaceModel.find({ campaignIds: campaignId }).exec();
  }

  async addToCampaign(id: string, campaignId: string): Promise<Marketplace> {
    const marketplace = await this.marketplaceModel.findById(id).exec();
    if (!marketplace) {
      throw new NotFoundException(`Marketplace item with ID ${id} not found`);
    }
    
    if (!marketplace.campaignIds.includes(campaignId)) {
      marketplace.campaignIds.push(campaignId);
      return marketplace.save();
    }
    return marketplace;
  }

  async removeFromCampaign(id: string, campaignId: string): Promise<Marketplace> {
    const marketplace = await this.marketplaceModel.findById(id).exec();
    if (!marketplace) {
      throw new NotFoundException(`Marketplace item with ID ${id} not found`);
    }
    
    marketplace.campaignIds = marketplace.campaignIds.filter(cid => cid !== campaignId);
    return marketplace.save();
  }

  async trackAnalytics(id: string, type: 'view' | 'click' | 'conversion', revenue?: number): Promise<Marketplace> {
    const marketplace = await this.marketplaceModel.findById(id).exec();
    if (!marketplace) {
      throw new NotFoundException(`Marketplace item with ID ${id} not found`);
    }

    switch (type) {
      case 'view':
        marketplace.analytics.views += 1;
        break;
      case 'click':
        marketplace.analytics.clicks += 1;
        break;
      case 'conversion':
        marketplace.analytics.conversions += 1;
        if (revenue) {
          marketplace.analytics.revenue += revenue;
        }
        break;
    }

    return marketplace.save();
  }

  async search(query: string): Promise<Marketplace[]> {
    return this.marketplaceModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
      status: 'active',
    }).exec();
  }
} 