import { PartialType } from '@nestjs/swagger';
import { CreateCreativeDto } from './create-creative.dto';

export class UpdateCreativeDto extends PartialType(CreateCreativeDto) {} 