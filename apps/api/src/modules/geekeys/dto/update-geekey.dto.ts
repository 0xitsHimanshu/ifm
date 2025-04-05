import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class UpdateGeekeyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

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
  @IsOptional()
  benefits?: string[];
} 