import { IsString, IsEnum, IsObject, IsOptional } from 'class-validator';

export class UpdateOBSIntegrationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(['Overlay', 'Banner', 'Alert'])
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsObject()
  @IsOptional()
  settings?: {
    password?: string;
    scene?: string;
    source?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    opacity?: number;
  };
} 