import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalyticsDocument = Analytics & Document;

@Schema({ timestamps: true })
export class Analytics {
  _id: Types.ObjectId;

  @Prop({ required: true, ref: 'Campaign' })
  campaignId: string;

  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ type: Object })
  impressions: {
    total: number;
    unique: number;
    byDevice: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
    byLocation: {
      country: string;
      count: number;
    }[];
    byTime: {
      hour: number;
      count: number;
    }[];
  };

  @Prop({ type: Object })
  clicks: {
    total: number;
    unique: number;
    ctr: number;
    byDevice: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
    byLocation: {
      country: string;
      count: number;
    }[];
    byTime: {
      hour: number;
      count: number;
    }[];
  };

  @Prop({ type: Object })
  conversions: {
    total: number;
    rate: number;
    byType: {
      type: string;
      count: number;
    }[];
    byDevice: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
    byLocation: {
      country: string;
      count: number;
    }[];
  };

  @Prop({ type: Object })
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    timeSpent: {
      average: number;
      distribution: {
        range: string;
        count: number;
      }[];
    };
  };

  @Prop({ type: Object })
  financial: {
    spend: number;
    revenue: number;
    roi: number;
    cpc: number;
    cpm: number;
    byDay: {
      date: Date;
      spend: number;
      revenue: number;
    }[];
  };

  @Prop({ type: Object })
  audience: {
    demographics: {
      age: {
        range: string;
        percentage: number;
      }[];
      gender: {
        type: string;
        percentage: number;
      }[];
    };
    interests: {
      category: string;
      percentage: number;
    }[];
    devices: {
      type: string;
      percentage: number;
    }[];
  };

  @Prop({ type: Object })
  performance: {
    loadTime: {
      average: number;
      distribution: {
        range: string;
        count: number;
      }[];
    };
    errors: {
      type: string;
      count: number;
    }[];
    uptime: number;
  };

  @Prop({ type: Date })
  lastUpdated: Date;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics); 