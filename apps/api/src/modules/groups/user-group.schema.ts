import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserGroupDocument = UserGroup & Document;

@Schema({ timestamps: true })
export class UserGroup {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  groupId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  joined: Date;

  @Prop({
    type: String,
    enum: ['member', 'moderator', 'admin'],
    default: 'member'
  })
  role: string;
}

export const UserGroupSchema = SchemaFactory.createForClass(UserGroup); 