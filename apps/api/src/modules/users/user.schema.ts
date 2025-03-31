import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ type: String, enum: ['user', 'admin', 'seller'], default: 'user' })
  role: string;

  @Prop({ type: Object })
  profile: {
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

  @Prop({ type: Object })
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };

  @Prop({ type: Object })
  wallet: {
    balance: number;
    currency: string;
  };

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isPhoneVerified: boolean;

  @Prop({ type: Date })
  lastLoginAt?: Date;

  @Prop({ type: [String], default: [] })
  campaignIds: string[];

  @Prop({ type: [String], default: [] })
  creativeIds: string[];

  @Prop({ type: [String], default: [] })
  marketplaceIds: string[];

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
