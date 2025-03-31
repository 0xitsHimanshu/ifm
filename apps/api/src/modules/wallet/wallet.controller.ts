import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { TransactionDto } from './dto/transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('wallet')
@Controller('wallet')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @Roles('user')
  @ApiOperation({ summary: 'Create a new wallet' })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  @Roles('user')
  @ApiOperation({ summary: 'Get user wallet' })
  findOne(@User('id') userId: string) {
    return this.walletService.findOne(userId);
  }

  @Patch()
  @Roles('user')
  @ApiOperation({ summary: 'Update wallet settings' })
  update(@User('id') userId: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(userId, updateWalletDto);
  }

  @Post('transaction')
  @Roles('user')
  @ApiOperation({ summary: 'Add a new transaction' })
  addTransaction(
    @User('id') userId: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.walletService.addTransaction(userId, transactionDto);
  }

  @Get('transactions')
  @Roles('user')
  @ApiOperation({ summary: 'Get transaction history' })
  getTransactionHistory(@User('id') userId: string) {
    return this.walletService.getTransactionHistory(userId);
  }

  @Patch('payment-methods')
  @Roles('user')
  @ApiOperation({ summary: 'Update payment methods' })
  updatePaymentMethods(
    @User('id') userId: string,
    @Body() paymentMethods: any,
  ) {
    return this.walletService.updatePaymentMethods(userId, paymentMethods);
  }

  @Patch('limits')
  @Roles('user')
  @ApiOperation({ summary: 'Update wallet limits' })
  updateLimits(@User('id') userId: string, @Body() limits: any) {
    return this.walletService.updateLimits(userId, limits);
  }

  @Patch('settings')
  @Roles('user')
  @ApiOperation({ summary: 'Update wallet settings' })
  updateSettings(@User('id') userId: string, @Body() settings: any) {
    return this.walletService.updateSettings(userId, settings);
  }

  @Post('refund')
  @Roles('admin')
  @ApiOperation({ summary: 'Process a refund' })
  processRefund(
    @Query('userId') userId: string,
    @Body('amount') amount: number,
    @Body('reason') reason: string,
  ) {
    return this.walletService.processRefund(userId, amount, reason);
  }

  @Post('campaign-payment')
  @Roles('user')
  @ApiOperation({ summary: 'Process a campaign payment' })
  processCampaignPayment(
    @User('id') userId: string,
    @Body('amount') amount: number,
    @Body('campaignId') campaignId: string,
  ) {
    return this.walletService.processCampaignPayment(
      userId,
      amount,
      campaignId,
    );
  }
}
