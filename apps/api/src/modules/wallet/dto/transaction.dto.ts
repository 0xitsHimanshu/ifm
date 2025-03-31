import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsObject, IsOptional } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ description: 'Transaction type', enum: ['deposit', 'withdrawal', 'campaign_payment', 'refund'] })
  @IsEnum(['deposit', 'withdrawal', 'campaign_payment', 'refund'])
  type: 'deposit' | 'withdrawal' | 'campaign_payment' | 'refund';

  @ApiProperty({ description: 'Transaction amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Transaction description' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Transaction metadata',
    required: false,
    example: {
      campaignId: 'campaign_123',
      paymentMethod: 'stripe',
      transactionId: 'txn_123',
      refundReason: 'Campaign cancelled'
    }
  })
  @IsObject()
  @IsOptional()
  metadata?: {
    campaignId?: string;
    paymentMethod?: string;
    transactionId?: string;
    refundReason?: string;
  };
} 