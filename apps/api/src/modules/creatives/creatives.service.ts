import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creative, CreativeDocument } from './creative.schema';
import { CreateCreativeDto } from './dto/create-creative.dto';
import { UpdateCreativeDto } from './dto/update-creative.dto';

@Injectable()
export class CreativesService {
  constructor(
    @InjectModel(Creative.name) private creativeModel: Model<CreativeDocument>,
  ) {}

  async create(createCreativeDto: CreateCreativeDto): Promise<Creative> {
    const createdCreative = new this.creativeModel(createCreativeDto);
    return createdCreative.save();
  }

  async findAll(userId: string): Promise<Creative[]> {
    return this.creativeModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Creative> {
    const creative = await this.creativeModel.findById(id).exec();
    if (!creative) {
      throw new NotFoundException(`Creative with ID ${id} not found`);
    }
    return creative;
  }

  async update(id: string, updateCreativeDto: UpdateCreativeDto): Promise<Creative> {
    const updatedCreative = await this.creativeModel
      .findByIdAndUpdate(id, updateCreativeDto, { new: true })
      .exec();
    if (!updatedCreative) {
      throw new NotFoundException(`Creative with ID ${id} not found`);
    }
    return updatedCreative;
  }

  async remove(id: string): Promise<Creative> {
    const deletedCreative = await this.creativeModel.findByIdAndDelete(id).exec();
    if (!deletedCreative) {
      throw new NotFoundException(`Creative with ID ${id} not found`);
    }
    return deletedCreative;
  }

  async findByUserId(userId: string): Promise<Creative[]> {
    return this.creativeModel.find({ userId }).exec();
  }

  async findByCampaignId(campaignId: string): Promise<Creative[]> {
    return this.creativeModel.find({ campaignIds: campaignId }).exec();
  }

  async addToCampaign(id: string, campaignId: string): Promise<Creative> {
    const creative = await this.creativeModel.findById(id).exec();
    if (!creative) {
      throw new NotFoundException(`Creative with ID ${id} not found`);
    }
    
    if (!creative.campaignIds.includes(campaignId)) {
      creative.campaignIds.push(campaignId);
      return creative.save();
    }
    return creative;
  }

  async removeFromCampaign(id: string, campaignId: string): Promise<Creative> {
    const creative = await this.creativeModel.findById(id).exec();
    if (!creative) {
      throw new NotFoundException(`Creative with ID ${id} not found`);
    }
    
    creative.campaignIds = creative.campaignIds.filter(cid => cid !== campaignId);
    return creative.save();
  }
} 