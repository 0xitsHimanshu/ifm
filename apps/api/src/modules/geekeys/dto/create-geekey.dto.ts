import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateGeekeyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  banner?: string;

  @IsOptional()
  requirements?: {
    level?: number;
    rpg?: number;
    invitationOnly?: boolean;
  };

  @IsArray()
  @IsString({ each: true })
  benefits: string[];
} 