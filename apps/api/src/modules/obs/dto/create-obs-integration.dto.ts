import { IsString, IsEnum, IsObject, IsOptional } from 'class-validator';

export class CreateOBSIntegrationDto {
  @IsString()
  name: string;

  @IsEnum(['Overlay', 'Banner', 'Alert'])
  type: string;

  @IsString()
  @IsOptional()
  campaignId?: string;

  @IsString()
  url: string;

  @IsObject()
  settings: {
    password: string;
    scene?: string;
    source?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    opacity?: number;
  };
} 