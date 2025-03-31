import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics, AnalyticsDocument } from './analytics.schema';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private analyticsModel: Model<AnalyticsDocument>,
  ) {}

  async create(createAnalyticsDto: CreateAnalyticsDto): Promise<Analytics> {
    const createdAnalytics = new this.analyticsModel({
      ...createAnalyticsDto,
      lastUpdated: new Date(),
    });
    return createdAnalytics.save();
  }

  async findOne(campaignId: string): Promise<Analytics> {
    const analytics = await this.analyticsModel.findOne({ campaignId }).exec();
    if (!analytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return analytics;
  }

  async update(campaignId: string, updateAnalyticsDto: UpdateAnalyticsDto): Promise<Analytics> {
    const updatedAnalytics = await this.analyticsModel
      .findOneAndUpdate(
        { campaignId },
        { ...updateAnalyticsDto, lastUpdated: new Date() },
        { new: true },
      )
      .exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async trackImpression(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update impressions
    analytics.impressions.total += 1;
    analytics.impressions.unique += 1;
    
    // Update device stats
    analytics.impressions.byDevice[data.device] += 1;
    
    // Update location stats
    const locationIndex = analytics.impressions.byLocation.findIndex(
      loc => loc.country === data.country,
    );
    if (locationIndex >= 0) {
      analytics.impressions.byLocation[locationIndex].count += 1;
    } else {
      analytics.impressions.byLocation.push({
        country: data.country,
        count: 1,
      });
    }
    
    // Update time stats
    const hour = new Date().getHours();
    const timeIndex = analytics.impressions.byTime.findIndex(t => t.hour === hour);
    if (timeIndex >= 0) {
      analytics.impressions.byTime[timeIndex].count += 1;
    } else {
      analytics.impressions.byTime.push({
        hour,
        count: 1,
      });
    }

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async trackClick(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update clicks
    analytics.clicks.total += 1;
    analytics.clicks.unique += 1;
    analytics.clicks.ctr = analytics.clicks.total / analytics.impressions.total;
    
    // Update device stats
    analytics.clicks.byDevice[data.device] += 1;
    
    // Update location stats
    const locationIndex = analytics.clicks.byLocation.findIndex(
      loc => loc.country === data.country,
    );
    if (locationIndex >= 0) {
      analytics.clicks.byLocation[locationIndex].count += 1;
    } else {
      analytics.clicks.byLocation.push({
        country: data.country,
        count: 1,
      });
    }
    
    // Update time stats
    const hour = new Date().getHours();
    const timeIndex = analytics.clicks.byTime.findIndex(t => t.hour === hour);
    if (timeIndex >= 0) {
      analytics.clicks.byTime[timeIndex].count += 1;
    } else {
      analytics.clicks.byTime.push({
        hour,
        count: 1,
      });
    }

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async trackConversion(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update conversions
    analytics.conversions.total += 1;
    analytics.conversions.rate = analytics.conversions.total / analytics.clicks.total;
    
    // Update conversion type
    const typeIndex = analytics.conversions.byType.findIndex(
      t => t.type === data.type,
    );
    if (typeIndex >= 0) {
      analytics.conversions.byType[typeIndex].count += 1;
    } else {
      analytics.conversions.byType.push({
        type: data.type,
        count: 1,
      });
    }
    
    // Update device stats
    analytics.conversions.byDevice[data.device] += 1;
    
    // Update location stats
    const locationIndex = analytics.conversions.byLocation.findIndex(
      loc => loc.country === data.country,
    );
    if (locationIndex >= 0) {
      analytics.conversions.byLocation[locationIndex].count += 1;
    } else {
      analytics.conversions.byLocation.push({
        country: data.country,
        count: 1,
      });
    }

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async trackEngagement(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update engagement metrics
    analytics.engagement.likes += data.likes || 0;
    analytics.engagement.shares += data.shares || 0;
    analytics.engagement.comments += data.comments || 0;
    
    // Update time spent
    const currentAverage = analytics.engagement.timeSpent.average;
    const newTimeSpent = data.timeSpent || 0;
    analytics.engagement.timeSpent.average =
      (currentAverage * analytics.engagement.likes + newTimeSpent) /
      (analytics.engagement.likes + 1);
    
    // Update time spent distribution
    const range = this.getTimeSpentRange(newTimeSpent);
    const distributionIndex = analytics.engagement.timeSpent.distribution.findIndex(
      d => d.range === range,
    );
    if (distributionIndex >= 0) {
      analytics.engagement.timeSpent.distribution[distributionIndex].count += 1;
    } else {
      analytics.engagement.timeSpent.distribution.push({
        range,
        count: 1,
      });
    }

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async updateFinancialMetrics(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update financial metrics
    analytics.financial.spend += data.spend || 0;
    analytics.financial.revenue += data.revenue || 0;
    analytics.financial.roi = analytics.financial.revenue / analytics.financial.spend;
    analytics.financial.cpc = analytics.financial.spend / analytics.clicks.total;
    analytics.financial.cpm = (analytics.financial.spend / analytics.impressions.total) * 1000;
    
    // Update daily financial data
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayIndex = analytics.financial.byDay.findIndex(
      d => d.date.getTime() === today.getTime(),
    );
    if (dayIndex >= 0) {
      analytics.financial.byDay[dayIndex].spend += data.spend || 0;
      analytics.financial.byDay[dayIndex].revenue += data.revenue || 0;
    } else {
      analytics.financial.byDay.push({
        date: today,
        spend: data.spend || 0,
        revenue: data.revenue || 0,
      });
    }

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async updateAudienceMetrics(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update demographics
    if (data.age) {
      const ageRange = this.getAgeRange(data.age);
      const ageIndex = analytics.audience.demographics.age.findIndex(
        a => a.range === ageRange,
      );
      if (ageIndex >= 0) {
        analytics.audience.demographics.age[ageIndex].percentage += 1;
      } else {
        analytics.audience.demographics.age.push({
          range: ageRange,
          percentage: 1,
        });
      }
    }
    
    if (data.gender) {
      const genderIndex = analytics.audience.demographics.gender.findIndex(
        g => g.type === data.gender,
      );
      if (genderIndex >= 0) {
        analytics.audience.demographics.gender[genderIndex].percentage += 1;
      } else {
        analytics.audience.demographics.gender.push({
          type: data.gender,
          percentage: 1,
        });
      }
    }
    
    // Update interests
    if (data.interests) {
      data.interests.forEach((interest: string) => {
        const interestIndex = analytics.audience.interests.findIndex(
          i => i.category === interest,
        );
        if (interestIndex >= 0) {
          analytics.audience.interests[interestIndex].percentage += 1;
        } else {
          analytics.audience.interests.push({
            category: interest,
            percentage: 1,
          });
        }
      });
    }
    
    // Update devices
    if (data.device) {
      const deviceIndex = analytics.audience.devices.findIndex(
        d => d.type === data.device,
      );
      if (deviceIndex >= 0) {
        analytics.audience.devices[deviceIndex].percentage += 1;
      } else {
        analytics.audience.devices.push({
          type: data.device,
          percentage: 1,
        });
      }
    }

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  async updatePerformanceMetrics(campaignId: string, data: any): Promise<Analytics> {
    const analytics = await this.findOne(campaignId);
    
    // Update load time
    const currentAverage = analytics.performance.loadTime.average;
    const newLoadTime = data.loadTime || 0;
    analytics.performance.loadTime.average =
      (currentAverage * analytics.impressions.total + newLoadTime) /
      (analytics.impressions.total + 1);
    
    // Update load time distribution
    const range = this.getLoadTimeRange(newLoadTime);
    const distributionIndex = analytics.performance.loadTime.distribution.findIndex(
      d => d.range === range,
    );
    if (distributionIndex >= 0) {
      analytics.performance.loadTime.distribution[distributionIndex].count += 1;
    } else {
      analytics.performance.loadTime.distribution.push({
        range,
        count: 1,
      });
    }
    
    // Update errors
    if (data.error) {
      const errorIndex = analytics.performance.errors.findIndex(
        e => e.type === data.error,
      );
      if (errorIndex >= 0) {
        analytics.performance.errors[errorIndex].count += 1;
      } else {
        analytics.performance.errors.push({
          type: data.error,
          count: 1,
        });
      }
    }
    
    // Update uptime
    const totalRequests = analytics.impressions.total;
    const errorCount = analytics.performance.errors.reduce(
      (sum, error) => sum + error.count,
      0,
    );
    analytics.performance.uptime = ((totalRequests - errorCount) / totalRequests) * 100;

    analytics.lastUpdated = new Date();
    const updatedAnalytics = await this.analyticsModel.findByIdAndUpdate(analytics._id, analytics, { new: true }).exec();
    if (!updatedAnalytics) {
      throw new NotFoundException(`Analytics not found for campaign ${campaignId}`);
    }
    return updatedAnalytics;
  }

  private getTimeSpentRange(timeSpent: number): string {
    if (timeSpent < 30) return '0-30s';
    if (timeSpent < 60) return '30-60s';
    if (timeSpent < 120) return '1-2m';
    if (timeSpent < 300) return '2-5m';
    return '5m+';
  }

  private getLoadTimeRange(loadTime: number): string {
    if (loadTime < 1) return '0-1s';
    if (loadTime < 2) return '1-2s';
    if (loadTime < 3) return '2-3s';
    if (loadTime < 5) return '3-5s';
    return '5s+';
  }

  private getAgeRange(age: number): string {
    if (age < 18) return 'Under 18';
    if (age < 25) return '18-24';
    if (age < 35) return '25-34';
    if (age < 45) return '35-44';
    if (age < 55) return '45-54';
    return '55+';
  }
} 