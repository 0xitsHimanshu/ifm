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
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create analytics for a campaign' })
  create(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get(':campaignId')
  @Roles('user', 'admin')
  @ApiOperation({ summary: 'Get analytics for a campaign' })
  findOne(@Param('campaignId') campaignId: string) {
    return this.analyticsService.findOne(campaignId);
  }

  @Patch(':campaignId')
  @Roles('admin')
  @ApiOperation({ summary: 'Update analytics for a campaign' })
  update(
    @Param('campaignId') campaignId: string,
    @Body() updateAnalyticsDto: UpdateAnalyticsDto,
  ) {
    return this.analyticsService.update(campaignId, updateAnalyticsDto);
  }

  @Post(':campaignId/impression')
  @Roles('user', 'admin')
  @ApiOperation({ summary: 'Track an impression' })
  trackImpression(@Param('campaignId') campaignId: string, @Body() data: any) {
    return this.analyticsService.trackImpression(campaignId, data);
  }

  @Post(':campaignId/click')
  @Roles('user', 'admin')
  @ApiOperation({ summary: 'Track a click' })
  trackClick(@Param('campaignId') campaignId: string, @Body() data: any) {
    return this.analyticsService.trackClick(campaignId, data);
  }

  @Post(':campaignId/conversion')
  @Roles('user', 'admin')
  @ApiOperation({ summary: 'Track a conversion' })
  trackConversion(@Param('campaignId') campaignId: string, @Body() data: any) {
    return this.analyticsService.trackConversion(campaignId, data);
  }

  @Post(':campaignId/engagement')
  @Roles('user', 'admin')
  @ApiOperation({ summary: 'Track user engagement' })
  trackEngagement(@Param('campaignId') campaignId: string, @Body() data: any) {
    return this.analyticsService.trackEngagement(campaignId, data);
  }

  @Post(':campaignId/financial')
  @Roles('admin')
  @ApiOperation({ summary: 'Update financial metrics' })
  updateFinancialMetrics(
    @Param('campaignId') campaignId: string,
    @Body() data: any,
  ) {
    return this.analyticsService.updateFinancialMetrics(campaignId, data);
  }

  @Post(':campaignId/audience')
  @Roles('admin')
  @ApiOperation({ summary: 'Update audience metrics' })
  updateAudienceMetrics(
    @Param('campaignId') campaignId: string,
    @Body() data: any,
  ) {
    return this.analyticsService.updateAudienceMetrics(campaignId, data);
  }

  @Post(':campaignId/performance')
  @Roles('admin')
  @ApiOperation({ summary: 'Update performance metrics' })
  updatePerformanceMetrics(
    @Param('campaignId') campaignId: string,
    @Body() data: any,
  ) {
    return this.analyticsService.updatePerformanceMetrics(campaignId, data);
  }
}
