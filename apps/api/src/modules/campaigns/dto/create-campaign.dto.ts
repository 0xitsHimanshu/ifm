import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsOptional, IsEnum, IsObject, IsArray } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ description: 'Name of the campaign' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the campaign', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Campaign budget' })
  @IsNumber()
  budget: number;

  @ApiProperty({ description: 'Campaign start date' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'Campaign end date', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Campaign status', enum: ['active', 'paused', 'completed'] })
  @IsEnum(['active', 'paused', 'completed'])
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Campaign targeting options', required: false })
  @IsObject()
  @IsOptional()
  targeting?: {
    locations?: string[];
    demographics?: {
      ageRange?: string[];
      gender?: string[];
    };
    interests?: string[];
  };

  @ApiProperty({ description: 'Array of creative IDs associated with the campaign', required: false })
  @IsArray()
  @IsOptional()
  creativeIds?: string[];

  @ApiProperty({ description: 'User ID who owns the campaign' })
  @IsString()
  userId: string;
} 