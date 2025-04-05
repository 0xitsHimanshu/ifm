import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  moderators: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  bannedUsers: Types.ObjectId[];

  @Prop({ default: false })
  isPrivate: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  memberCount: number;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  banner: string;

  @Prop({ type: Object, default: {} })
  settings: {
    allowMemberInvites: boolean;
    requireApproval: boolean;
    maxMembers: number;
  };
}

export const GroupSchema = SchemaFactory.createForClass(Group); 