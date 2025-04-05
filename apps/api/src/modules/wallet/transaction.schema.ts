import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['earning', 'deposit', 'withdrawal', 'staking', 'referral'],
    required: true
  })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    type: String,
    enum: ['gloCoins', 'bloCoins'],
    required: true
  })
  currency: string;

  @Prop({ type: Types.ObjectId, ref: 'Campaign' })
  campaignId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  referralId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Stake' })
  stakeId?: Types.ObjectId;

  @Prop()
  txHash?: string;

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  })
  status: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction); 