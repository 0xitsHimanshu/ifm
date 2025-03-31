import { IsString, IsNumber, IsObject, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class DeviceMetricsDto {
  @IsNumber()
  desktop: number;

  @IsNumber()
  mobile: number;

  @IsNumber()
  tablet: number;
}

class LocationMetricsDto {
  @IsString()
  country: string;

  @IsNumber()
  count: number;
}

class TimeMetricsDto {
  @IsNumber()
  hour: number;

  @IsNumber()
  count: number;
}

class ImpressionsDto {
  @IsNumber()
  total: number;

  @IsNumber()
  unique: number;

  @IsObject()
  @ValidateNested()
  @Type(() => DeviceMetricsDto)
  byDevice: DeviceMetricsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationMetricsDto)
  byLocation: LocationMetricsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeMetricsDto)
  byTime: TimeMetricsDto[];
}

class ClicksDto extends ImpressionsDto {
  @IsNumber()
  ctr: number;
}

class ConversionsDto {
  @IsNumber()
  total: number;

  @IsNumber()
  rate: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  byType: { type: string; count: number }[];

  @IsObject()
  @ValidateNested()
  @Type(() => DeviceMetricsDto)
  byDevice: DeviceMetricsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationMetricsDto)
  byLocation: LocationMetricsDto[];
}

class EngagementDto {
  @IsNumber()
  likes: number;

  @IsNumber()
  shares: number;

  @IsNumber()
  comments: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  timeSpent: {
    average: number;
    distribution: { range: string; count: number }[];
  };
}

class FinancialDto {
  @IsNumber()
  spend: number;

  @IsNumber()
  revenue: number;

  @IsNumber()
  roi: number;

  @IsNumber()
  cpc: number;

  @IsNumber()
  cpm: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  byDay: { date: Date; spend: number; revenue: number }[];
}

class AudienceDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  demographics: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  interests: { category: string; percentage: number }[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  devices: { type: string; percentage: number }[];
}

class PerformanceDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  loadTime: {
    average: number;
    distribution: { range: string; count: number }[];
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  errors: { type: string; count: number }[];

  @IsNumber()
  uptime: number;
}

export class CreateAnalyticsDto {
  @IsString()
  campaignId: string;

  @IsString()
  userId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ImpressionsDto)
  impressions: ImpressionsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => ClicksDto)
  clicks: ClicksDto;

  @IsObject()
  @ValidateNested()
  @Type(() => ConversionsDto)
  conversions: ConversionsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => EngagementDto)
  engagement: EngagementDto;

  @IsObject()
  @ValidateNested()
  @Type(() => FinancialDto)
  financial: FinancialDto;

  @IsObject()
  @ValidateNested()
  @Type(() => AudienceDto)
  audience: AudienceDto;

  @IsObject()
  @ValidateNested()
  @Type(() => PerformanceDto)
  performance: PerformanceDto;
} 