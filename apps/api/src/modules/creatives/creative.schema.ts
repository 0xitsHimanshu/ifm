import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CreativeDocument = Creative & Document;

@Schema({ timestamps: true })
export class Creative {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string; // image, video, carousel, etc.

  @Prop({ required: true })
  url: string; // URL to the creative asset

  @Prop({ type: Object })
  dimensions: {
    width: number;
    height: number;
  };

  @Prop({ type: Object })
  metadata: {
    fileSize?: number;
    format?: string;
    duration?: number; // for videos
  };

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ default: 'active', enum: ['active', 'inactive', 'archived'] })
  status: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [String], default: [] })
  campaignIds: string[]; // Reference to campaigns using this creative
}

export const CreativeSchema = SchemaFactory.createForClass(Creative); 