import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OBSController } from './obs.controller';
import { OBSService } from './obs.service';
import { OBSIntegration, OBSIntegrationSchema } from './obs-integration.schema';
import { User, UserSchema } from '../users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OBSIntegration.name, schema: OBSIntegrationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [OBSController],
  providers: [OBSService],
  exports: [OBSService],
})
export class OBSModule {} 