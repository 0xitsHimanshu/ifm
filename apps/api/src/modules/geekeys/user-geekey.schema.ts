import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserGeekeyDocument = UserGeekey & Document;

@Schema({ timestamps: true })
export class UserGeekey {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Geekey', required: true })
  geekeyId: Types.ObjectId;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Date, default: Date.now })
  acquired: Date;
}

export const UserGeekeySchema = SchemaFactory.createForClass(UserGeekey); 