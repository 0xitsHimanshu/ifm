import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsObject, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateCreativeDto {
  @ApiProperty({ description: 'Name of the creative' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the creative', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Type of creative', enum: ['image', 'video', 'carousel'] })
  @IsEnum(['image', 'video', 'carousel'])
  type: string;

  @ApiProperty({ description: 'URL to the creative asset' })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Dimensions of the creative',
    example: { width: 1200, height: 628 }
  })
  @IsObject()
  dimensions: {
    width: number;
    height: number;
  };

  @ApiProperty({
    description: 'Metadata of the creative',
    required: false,
    example: { fileSize: 1024, format: 'jpg', duration: 30 }
  })
  @IsObject()
  @IsOptional()
  metadata?: {
    fileSize?: number;
    format?: string;
    duration?: number;
  };

  @ApiProperty({ description: 'Tags for the creative', required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ description: 'Status of the creative', enum: ['active', 'inactive', 'archived'], default: 'active' })
  @IsEnum(['active', 'inactive', 'archived'])
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'User ID who owns the creative' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Campaign IDs using this creative', required: false })
  @IsArray()
  @IsOptional()
  campaignIds?: string[];
} 