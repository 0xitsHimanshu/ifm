import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsObject, IsArray, IsOptional } from 'class-validator';

export class CreateMarketplaceDto {
  @ApiProperty({ description: 'Title of the marketplace listing' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the marketplace listing' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price of the marketplace listing' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Category of the marketplace listing' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Tags for the marketplace listing', required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Specifications of the marketplace listing',
    required: false,
    example: {
      platform: ['facebook', 'instagram'],
      targetAudience: ['18-24', '25-34'],
      duration: 30,
      reach: 100000,
      engagement: 0.05
    }
  })
  @IsObject()
  @IsOptional()
  specifications?: {
    platform?: string[];
    targetAudience?: string[];
    duration?: number;
    reach?: number;
    engagement?: number;
  };

  @ApiProperty({
    description: 'Media assets for the marketplace listing',
    required: false,
    example: {
      thumbnail: 'url-to-thumbnail',
      images: ['url-to-image1', 'url-to-image2'],
      video: 'url-to-video'
    }
  })
  @IsObject()
  @IsOptional()
  media?: {
    thumbnail?: string;
    images?: string[];
    video?: string;
  };

  @ApiProperty({ description: 'ID of the seller' })
  @IsString()
  sellerId: string;

  @ApiProperty({ description: 'Status of the listing', enum: ['active', 'inactive', 'sold'], default: 'active' })
  @IsEnum(['active', 'inactive', 'sold'])
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Analytics data for the listing',
    required: false,
    example: {
      views: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0
    }
  })
  @IsObject()
  @IsOptional()
  analytics?: {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };

  @ApiProperty({ description: 'Campaign IDs using this marketplace item', required: false })
  @IsArray()
  @IsOptional()
  campaignIds?: string[];
} 