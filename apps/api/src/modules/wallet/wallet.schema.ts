import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
  _id: Types.ObjectId;

  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ type: [Object], default: [] })
  transactions: {
    id: string;
    type: 'deposit' | 'withdrawal' | 'campaign_payment' | 'refund';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    description: string;
    metadata: {
      campaignId?: string;
      paymentMethod?: string;
      transactionId?: string;
      refundReason?: string;
    };
    createdAt: Date;
  }[];

  @Prop({ type: Object })
  paymentMethods: {
    stripe?: {
      customerId: string;
      defaultPaymentMethodId?: string;
    };
    paypal?: {
      email: string;
      merchantId?: string;
    };
  };

  @Prop({ type: Object })
  limits: {
    dailyWithdrawal: number;
    monthlyWithdrawal: number;
    minimumBalance: number;
  };

  @Prop({ type: Object })
  settings: {
    notifications: {
      lowBalance: boolean;
      transaction: boolean;
      withdrawal: boolean;
    };
    autoRecharge: {
      enabled: boolean;
      threshold: number;
      amount: number;
    };
  };
}

export const WalletSchema = SchemaFactory.createForClass(Wallet); 