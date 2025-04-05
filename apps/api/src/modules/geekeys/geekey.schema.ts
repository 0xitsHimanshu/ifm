import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GeekeyDocument = Geekey & Document;

@Schema({ timestamps: true })
export class Geekey {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: Types.ObjectId[];

  @Prop({ default: 0 })
  memberCount: number;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: null })
  icon: string;

  @Prop({ default: null })
  banner: string;

  @Prop({ type: Object, default: {} })
  requirements: {
    level?: number;
    rpg?: number;
    invitationOnly?: boolean;
  };

  @Prop({ type: [String], required: true })
  benefits: string[];

  @Prop({ type: Object, default: {} })
  stats: {
    totalXP: number;
    totalLevels: number;
    totalMembers: number;
    totalQuests: number;
  };

  @Prop({ type: [Object], default: [] })
  quests: {
    id: string;
    name: string;
    description: string;
    rewards: {
      xp: number;
      coins: number;
    };
    requirements: {
      level?: number;
      rpg?: number;
    };
    completedBy: Types.ObjectId[];
    createdAt: Date;
  }[];
}

export const GeekeySchema = SchemaFactory.createForClass(Geekey); 