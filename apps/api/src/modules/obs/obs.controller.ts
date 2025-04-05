import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OBSService } from './obs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.schema';
import { CreateOBSIntegrationDto } from './dto/create-obs-integration.dto';
import { UpdateOBSIntegrationDto } from './dto/update-obs-integration.dto';

@Controller('obs')
@UseGuards(JwtAuthGuard)
export class OBSController {
  constructor(private readonly obsService: OBSService) {}

  @Post()
  async createIntegration(@Body() createOBSIntegrationDto: CreateOBSIntegrationDto, @CurrentUser() user: User) {
    return this.obsService.createIntegration(createOBSIntegrationDto, user._id.toString());
  }

  @Get()
  async getIntegrations(@CurrentUser() user: User) {
    return this.obsService.getIntegrations(user._id.toString());
  }

  @Get(':id')
  async getIntegration(@Param('id') id: string, @CurrentUser() user: User) {
    return this.obsService.getIntegration(id, user._id.toString());
  }

  @Put(':id')
  async updateIntegration(
    @Param('id') id: string,
    @Body() updateOBSIntegrationDto: UpdateOBSIntegrationDto,
    @CurrentUser() user: User,
  ) {
    return this.obsService.updateIntegration(id, updateOBSIntegrationDto, user._id.toString());
  }

  @Delete(':id')
  async deleteIntegration(@Param('id') id: string, @CurrentUser() user: User) {
    return this.obsService.deleteIntegration(id, user._id.toString());
  }

  @Post(':id/connect')
  async connectIntegration(@Param('id') id: string, @CurrentUser() user: User) {
    return this.obsService.connectIntegration(id, user._id.toString());
  }

  @Post(':id/disconnect')
  async disconnectIntegration(@Param('id') id: string, @CurrentUser() user: User) {
    return this.obsService.disconnectIntegration(id, user._id.toString());
  }

  @Post(':id/test')
  async testIntegration(@Param('id') id: string, @CurrentUser() user: User) {
    return this.obsService.testIntegration(id, user._id.toString());
  }
} 