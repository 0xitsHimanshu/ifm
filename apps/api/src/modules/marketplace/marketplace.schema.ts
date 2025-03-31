import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketplaceDocument = Marketplace & Document;

@Schema({ timestamps: true })
export class Marketplace {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Object })
  specifications: {
    platform?: string[];
    targetAudience?: string[];
    duration?: number;
    reach?: number;
    engagement?: number;
  };

  @Prop({ type: Object })
  media: {
    thumbnail?: string;
    images?: string[];
    video?: string;
  };

  @Prop({ required: true })
  sellerId: string;

  @Prop({ default: 'active', enum: ['active', 'inactive', 'sold'] })
  status: string;

  @Prop({ type: Object })
  analytics: {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };

  @Prop({ type: [String], default: [] })
  campaignIds: string[]; // Reference to campaigns using this marketplace item
}

export const MarketplaceSchema = SchemaFactory.createForClass(Marketplace); 