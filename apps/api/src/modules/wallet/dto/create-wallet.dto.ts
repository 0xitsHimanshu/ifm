import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'User ID associated with the wallet' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Initial wallet balance', default: 0 })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ description: 'Wallet currency', default: 'USD' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    description: 'Payment methods configuration',
    required: false,
    example: {
      stripe: {
        customerId: 'cus_123',
        defaultPaymentMethodId: 'pm_123'
      },
      paypal: {
        email: 'user@example.com',
        merchantId: 'merchant_123'
      }
    }
  })
  @IsObject()
  @IsOptional()
  paymentMethods?: {
    stripe?: {
      customerId: string;
      defaultPaymentMethodId?: string;
    };
    paypal?: {
      email: string;
      merchantId?: string;
    };
  };

  @ApiProperty({
    description: 'Wallet limits configuration',
    required: false,
    example: {
      dailyWithdrawal: 1000,
      monthlyWithdrawal: 10000,
      minimumBalance: 100
    }
  })
  @IsObject()
  @IsOptional()
  limits?: {
    dailyWithdrawal: number;
    monthlyWithdrawal: number;
    minimumBalance: number;
  };

  @ApiProperty({
    description: 'Wallet settings configuration',
    required: false,
    example: {
      notifications: {
        lowBalance: true,
        transaction: true,
        withdrawal: true
      },
      autoRecharge: {
        enabled: true,
        threshold: 100,
        amount: 500
      }
    }
  })
  @IsObject()
  @IsOptional()
  settings?: {
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