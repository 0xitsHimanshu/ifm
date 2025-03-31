import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, IsObject, IsBoolean, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'User role', enum: ['user', 'admin', 'seller'], default: 'user' })
  @IsEnum(['user', 'admin', 'seller'])
  @IsOptional()
  role?: string;

  @ApiProperty({
    description: 'User profile information',
    required: false,
    example: {
      avatar: 'url-to-avatar',
      bio: 'User bio',
      company: 'Company name',
      website: 'https://example.com',
      location: 'City, Country',
      socialLinks: {
        facebook: 'facebook-profile',
        twitter: 'twitter-profile',
        linkedin: 'linkedin-profile',
        instagram: 'instagram-profile'
      }
    }
  })
  @IsObject()
  @IsOptional()
  profile?: {
    avatar?: string;
    bio?: string;
    company?: string;
    website?: string;
    location?: string;
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  };

  @ApiProperty({
    description: 'User preferences',
    required: false,
    example: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      theme: 'light',
      language: 'en',
      timezone: 'UTC'
    }
  })
  @IsObject()
  @IsOptional()
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };

  @ApiProperty({
    description: 'User wallet information',
    required: false,
    example: {
      balance: 0,
      currency: 'USD'
    }
  })
  @IsObject()
  @IsOptional()
  wallet?: {
    balance: number;
    currency: string;
  };
} 