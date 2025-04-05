import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeekeysController } from './geekeys.controller';
import { GeekeysService } from './geekeys.service';
import { Geekey, GeekeySchema } from './geekey.schema';
import { User, UserSchema } from '../users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Geekey.name, schema: GeekeySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GeekeysController],
  providers: [GeekeysService],
  exports: [GeekeysService],
})
export class GeekeysModule {}