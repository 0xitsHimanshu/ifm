import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  gloCoins: number;

  @Prop({ default: 0 })
  bloCoins: number;

  @Prop({ default: 0 })
  pendingEarnings: number;

  @Prop({ default: 0 })
  stakingRewards: number;

  @Prop({ default: 0 })
  referralBonus: number;

  @Prop({ default: 0 })
  totalEarned: number;

  @Prop({ type: Date })
  nextPayout: Date;

  @Prop({ type: [Object], default: [] })
  transactions: {
    type: string;
    amount: number;
    currency: string;
    status: string;
    date: Date;
    description?: string;
  }[];
}

export const WalletSchema = SchemaFactory.createForClass(Wallet); 