import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StakingPlanDocument = StakingPlan & Document;

@Schema({ timestamps: true })
export class StakingPlan {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  apy: number;

  @Prop({ required: true })
  minAmount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  benefits: string[];
}

export const StakingPlanSchema = SchemaFactory.createForClass(StakingPlan); 