import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserCampaignDocument = UserCampaign & Document;

@Schema({ timestamps: true })
export class UserCampaign {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaignId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['active', 'paused', 'completed', 'pending'],
    default: 'pending'
  })
  status: string;

  @Prop({ default: 0 })
  progress: number;

  @Prop({ default: 0 })
  impressions: number;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: 0 })
  conversions: number;

  @Prop({ default: 0 })
  ctr: number;

  @Prop({ default: 0 })
  cvr: number;

  @Prop({ default: 0 })
  cpi: number;

  @Prop({ default: 0 })
  earnings: number;

  @Prop({ default: 0 })
  spent: number;

  @Prop({ default: 0 })
  streamHours: number;

  @Prop({ default: 0 })
  mentions: number;

  @Prop({ default: false })
  productDemoCompleted: boolean;

  @Prop({ default: false })
  productReviewCompleted: boolean;

  @Prop({ default: 0 })
  gameplayMinutesCompleted: number;

  @Prop({ default: false })
  participationCompleted: boolean;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: [Object] })
  dailyPerformance: {
    date: Date;
    impressions: number;
    clicks: number;
    conversions: number;
    earnings: number;
  }[];
}

export const UserCampaignSchema = SchemaFactory.createForClass(UserCampaign); 