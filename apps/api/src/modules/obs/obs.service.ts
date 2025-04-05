import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OBSIntegration } from './obs-integration.schema';
import { User } from '../users/user.schema';
import { CreateOBSIntegrationDto } from './dto/create-obs-integration.dto';
import { UpdateOBSIntegrationDto } from './dto/update-obs-integration.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OBSService {
  constructor(
    @InjectModel(OBSIntegration.name) private obsIntegrationModel: Model<OBSIntegration>,
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async createIntegration(createOBSIntegrationDto: CreateOBSIntegrationDto, userId: string) {
    const integration = new this.obsIntegrationModel({
      ...createOBSIntegrationDto,
      userId,
      status: 'inactive',
    });
    return integration.save();
  }

  async getIntegrations(userId: string) {
    return this.obsIntegrationModel.find({ userId }).exec();
  }

  async getIntegration(id: string, userId: string) {
    const integration = await this.obsIntegrationModel.findById(id);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (integration.userId.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to access this integration');
    }

    return integration;
  }

  async updateIntegration(id: string, updateOBSIntegrationDto: UpdateOBSIntegrationDto, userId: string) {
    const integration = await this.obsIntegrationModel.findById(id);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (integration.userId.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to update this integration');
    }

    return this.obsIntegrationModel.findByIdAndUpdate(id, updateOBSIntegrationDto, { new: true });
  }

  async deleteIntegration(id: string, userId: string) {
    const integration = await this.obsIntegrationModel.findById(id);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (integration.userId.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this integration');
    }

    return this.obsIntegrationModel.findByIdAndDelete(id);
  }

  async connectIntegration(id: string, userId: string) {
    const integration = await this.obsIntegrationModel.findById(id);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (integration.userId.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to connect this integration');
    }

    try {
      // Test connection to OBS
      const response = await axios.get(`${integration.url}/api/version`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(integration.settings.password).toString('base64')}`,
        },
      });

      if (response.status === 200) {
        integration.status = 'active';
        await integration.save();
        return { success: true, message: 'Successfully connected to OBS' };
      }
    } catch (error) {
      integration.status = 'inactive';
      await integration.save();
      throw new UnauthorizedException('Failed to connect to OBS');
    }
  }

  async disconnectIntegration(id: string, userId: string) {
    const integration = await this.obsIntegrationModel.findById(id);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (integration.userId.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to disconnect this integration');
    }

    integration.status = 'inactive';
    return integration.save();
  }

  async testIntegration(id: string, userId: string) {
    const integration = await this.obsIntegrationModel.findById(id);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (integration.userId.toString() !== userId) {
      throw new UnauthorizedException('You are not authorized to test this integration');
    }

    try {
      // Test connection to OBS
      const response = await axios.get(`${integration.url}/api/version`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(integration.settings.password).toString('base64')}`,
        },
      });

      if (response.status === 200) {
        return { success: true, message: 'Successfully connected to OBS' };
      }
    } catch (error) {
      throw new UnauthorizedException('Failed to connect to OBS');
    }
  }
} 