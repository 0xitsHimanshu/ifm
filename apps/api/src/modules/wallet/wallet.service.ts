import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { TransactionDto } from './dto/transaction.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletModel
      .findOne({ userId: createWalletDto.userId })
      .exec();
    if (existingWallet) {
      throw new BadRequestException('Wallet already exists for this user');
    }

    const createdWallet = new this.walletModel({
      ...createWalletDto,
      limits: {
        dailyWithdrawal: 1000,
        monthlyWithdrawal: 10000,
        minimumBalance: 100,
      },
      settings: {
        notifications: {
          lowBalance: true,
          transaction: true,
          withdrawal: true,
        },
        autoRecharge: {
          enabled: false,
          threshold: 100,
          amount: 500,
        },
      },
    });

    return createdWallet.save();
  }

  async findOne(userId: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ userId }).exec();
    if (!wallet) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }
    return wallet;
  }

  async update(
    userId: string,
    updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet> {
    const updatedWallet = await this.walletModel
      .findOneAndUpdate({ userId }, updateWalletDto, { new: true })
      .exec();
    if (!updatedWallet) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }
    return updatedWallet;
  }

  async addTransaction(
    userId: string,
    transactionDto: TransactionDto,
  ): Promise<Wallet> {
    const wallet = await this.findOne(userId);

    const transaction = {
      id: uuidv4(),
      type: transactionDto.type,
      amount: transactionDto.amount,
      status: 'pending' as const,
      description: transactionDto.description,
      metadata: transactionDto.metadata || {},
      createdAt: new Date(),
    };

    wallet.transactions.push(transaction);
    const updatedWallet = await this.walletModel
      .findByIdAndUpdate(wallet._id, wallet, { new: true })
      .exec();
    if (!updatedWallet) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }
    return updatedWallet;
  }

  async getTransactionHistory(userId: string): Promise<any[]> {
    const wallet = await this.findOne(userId);
    return wallet.transactions;
  }

  async updatePaymentMethods(
    userId: string,
    paymentMethods: any,
  ): Promise<Wallet> {
    return this.update(userId, { paymentMethods });
  }

  async updateLimits(userId: string, limits: any): Promise<Wallet> {
    return this.update(userId, { limits });
  }

  async updateSettings(userId: string, settings: any): Promise<Wallet> {
    return this.update(userId, { settings });
  }

  async processRefund(
    userId: string,
    amount: number,
    reason: string,
  ): Promise<Wallet> {
    const wallet = await this.findOne(userId);

    const transaction = {
      id: uuidv4(),
      type: 'refund' as const,
      amount,
      status: 'completed' as const,
      description: `Refund: ${reason}`,
      metadata: { refundReason: reason },
      createdAt: new Date(),
    };

    wallet.balance += amount;
    wallet.transactions.push(transaction);
    const updatedWallet = await this.walletModel
      .findByIdAndUpdate(wallet._id, wallet, { new: true })
      .exec();
    if (!updatedWallet) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }
    return updatedWallet;
  }

  async processCampaignPayment(
    userId: string,
    amount: number,
    campaignId: string,
  ): Promise<Wallet> {
    const wallet = await this.findOne(userId);

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const transaction = {
      id: uuidv4(),
      type: 'campaign_payment' as const,
      amount,
      status: 'completed' as const,
      description: `Campaign payment for campaign ${campaignId}`,
      metadata: { campaignId },
      createdAt: new Date(),
    };

    wallet.balance -= amount;
    wallet.transactions.push(transaction);
    const updatedWallet = await this.walletModel
      .findByIdAndUpdate(wallet._id, wallet, { new: true })
      .exec();
    if (!updatedWallet) {
      throw new NotFoundException(`Wallet not found for user ${userId}`);
    }
    return updatedWallet;
  }
}
