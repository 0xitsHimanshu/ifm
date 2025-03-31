import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 'active', enum: ['active', 'paused', 'completed'] })
  status: string;

  @Prop({ type: Object })
  targeting: {
    locations?: string[];
    demographics?: {
      ageRange?: string[];
      gender?: string[];
    };
    interests?: string[];
  };

  @Prop({ type: [{ type: String }] })
  creativeIds: string[];

  @Prop({ required: true })
  userId: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign); 