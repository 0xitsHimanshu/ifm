import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatar?: string;

  @Prop()
  coverImage?: string;

  @Prop({ maxlength: 500 })
  bio?: string;

  @Prop()
  location?: string;

  @Prop({ type: Date, default: Date.now })
  joinDate: Date;

  @Prop({ type: Date })
  lastLoginAt?: Date;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 1 })
  level: number;

  @Prop({ default: 0 })
  xps: number;

  @Prop({ default: 1000 })
  maxXps: number;

  @Prop({ default: 0 })
  rpg: number;

  @Prop({ default: 0 })
  energyPacks: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Object })
  socialLinks: {
    twitch?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };

  @Prop({ type: [Object] })
  streamingPlatforms: {
    name: string;
    username: string;
    followers: number;
    verified: boolean;
    connected: boolean;
  }[];

  @Prop({ type: [Object] })
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: string;
    date: Date;
  }[];

  @Prop({ type: [String], default: [] })
  groups: string[];

  @Prop({ type: [String], default: [] })
  geekeys: string[];

  @Prop({ type: Object })
  wallet: {
    gloCoins: number;
    bloCoins: number;
  };

  @Prop({ type: Object })
  settings: {
    account: {
      phone?: string;
      language: string;
      timezone: string;
      twoFactorEnabled: boolean;
    };
    notifications: {
      email: boolean;
      push: boolean;
      campaigns: boolean;
      payments: boolean;
      platform: boolean;
      marketing: boolean;
    };
  };

  @Prop({ type: String, enum: ['user', 'admin', 'moderator'], default: 'user' })
  role: string;

  createdAt: Date;
  updatedAt: Date;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
