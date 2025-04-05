import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: ['draft', 'available', 'active', 'paused', 'completed', 'rejected', 'exclusive', 'locked'],
    default: 'draft'
  })
  status: string;

  @Prop({
    type: String,
    enum: ['CPI', 'CPA', 'CPM'],
    required: true
  })
  type: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  advertiser: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  details: string;

  @Prop()
  image?: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 1 })
  multiplier: number;

  @Prop({ type: Object })
  requirements: {
    impressions: number;
    level: number;
    rpg: number;
    xps: number;
    energyPacks: number;
    keyRequired?: string;
    bloCoinsDeposit?: number;
    geekeys?: {
      name: string;
      active: boolean;
    }[];
    streamHours?: number;
    mentionCount?: number;
    productDemo?: boolean;
    productReview?: boolean;
    gameplayMinutes?: number;
    participationRequired?: boolean;
  };

  @Prop({ type: Object })
  earnings: {
    gloCoins: number;
    bloCoins: number;
  };
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign); 