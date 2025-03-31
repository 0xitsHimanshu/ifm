import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';
import { CreativesService } from './creatives.service';
import { CreateCreativeDto } from './dto/create-creative.dto';
import { UpdateCreativeDto } from './dto/update-creative.dto';

@ApiTags('creatives')
@Controller('creatives')
export class CreativesController {
  constructor(private readonly creativesService: CreativesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new creative' })
  @ApiResponse({ status: 201, description: 'Creative created successfully.' })
  async create(@Body() createCreativeDto: CreateCreativeDto) {
    return this.creativesService.create(createCreativeDto);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a creative file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif|mp4)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Here you would typically upload to a cloud storage service
    // and return the URL
    return {
      url: file.path, // This should be replaced with the actual cloud storage URL
      metadata: {
        fileSize: file.size,
        format: file.mimetype,
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all creatives' })
  async findAll(@Query('userId') userId: string) {
    return this.creativesService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a creative by id' })
  async findOne(@Param('id') id: string) {
    return this.creativesService.findOne(id);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get all creatives for a campaign' })
  async findByCampaignId(@Param('campaignId') campaignId: string) {
    return this.creativesService.findByCampaignId(campaignId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a creative' })
  async update(
    @Param('id') id: string,
    @Body() updateCreativeDto: UpdateCreativeDto,
  ) {
    return this.creativesService.update(id, updateCreativeDto);
  }

  @Put(':id/campaign/:campaignId')
  @ApiOperation({ summary: 'Add creative to campaign' })
  async addToCampaign(
    @Param('id') id: string,
    @Param('campaignId') campaignId: string,
  ) {
    return this.creativesService.addToCampaign(id, campaignId);
  }

  @Delete(':id/campaign/:campaignId')
  @ApiOperation({ summary: 'Remove creative from campaign' })
  async removeFromCampaign(
    @Param('id') id: string,
    @Param('campaignId') campaignId: string,
  ) {
    return this.creativesService.removeFromCampaign(id, campaignId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a creative' })
  async remove(@Param('id') id: string) {
    return this.creativesService.remove(id);
  }
} 