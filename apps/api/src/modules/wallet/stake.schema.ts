import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StakeDocument = Stake & Document;

@Schema({ timestamps: true })
export class Stake {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'StakingPlan', required: true })
  planId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ default: 0 })
  earned: number;

  @Prop({
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  })
  status: string;
}

export const StakeSchema = SchemaFactory.createForClass(Stake); 