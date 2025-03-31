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
import { MarketplaceService } from './marketplace.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';

@ApiTags('marketplace')
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new marketplace listing' })
  @ApiResponse({ status: 201, description: 'Marketplace listing created successfully.' })
  async create(@Body() createMarketplaceDto: CreateMarketplaceDto) {
    return this.marketplaceService.create(createMarketplaceDto);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a marketplace media file' })
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
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
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
  @ApiOperation({ summary: 'Get all marketplace listings' })
  async findAll(@Query('category') category?: string) {
    if (category) {
      return this.marketplaceService.findByCategory(category);
    }
    return this.marketplaceService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search marketplace listings' })
  async search(@Query('q') query: string) {
    return this.marketplaceService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a marketplace listing by id' })
  async findOne(@Param('id') id: string) {
    return this.marketplaceService.findOne(id);
  }

  @Get('seller/:sellerId')
  @ApiOperation({ summary: 'Get all marketplace listings by seller' })
  async findBySellerId(@Param('sellerId') sellerId: string) {
    return this.marketplaceService.findBySellerId(sellerId);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get all marketplace listings for a campaign' })
  async findByCampaignId(@Param('campaignId') campaignId: string) {
    return this.marketplaceService.findByCampaignId(campaignId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a marketplace listing' })
  async update(
    @Param('id') id: string,
    @Body() updateMarketplaceDto: UpdateMarketplaceDto,
  ) {
    return this.marketplaceService.update(id, updateMarketplaceDto);
  }

  @Put(':id/campaign/:campaignId')
  @ApiOperation({ summary: 'Add marketplace listing to campaign' })
  async addToCampaign(
    @Param('id') id: string,
    @Param('campaignId') campaignId: string,
  ) {
    return this.marketplaceService.addToCampaign(id, campaignId);
  }

  @Delete(':id/campaign/:campaignId')
  @ApiOperation({ summary: 'Remove marketplace listing from campaign' })
  async removeFromCampaign(
    @Param('id') id: string,
    @Param('campaignId') campaignId: string,
  ) {
    return this.marketplaceService.removeFromCampaign(id, campaignId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a marketplace listing' })
  async remove(@Param('id') id: string) {
    return this.marketplaceService.remove(id);
  }

  @Post(':id/analytics')
  @ApiOperation({ summary: 'Track marketplace listing analytics' })
  async trackAnalytics(
    @Param('id') id: string,
    @Body('type') type: 'view' | 'click' | 'conversion',
    @Body('revenue') revenue?: number,
  ) {
    return this.marketplaceService.trackAnalytics(id, type, revenue);
  }
} 