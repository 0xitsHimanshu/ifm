import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OBSIntegrationDocument = OBSIntegration & Document;

@Schema({ timestamps: true })
export class OBSIntegration {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: ['Overlay', 'Banner', 'Alert'],
    required: true
  })
  type: string;

  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Campaign' })
  campaignId?: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  settings: {
    password: string;
    position?: string;
    size?: string;
    animation?: string;
    duration?: number;
    scene?: string;
    source?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    opacity?: number;
  };
}

export const OBSIntegrationSchema = SchemaFactory.createForClass(OBSIntegration); 