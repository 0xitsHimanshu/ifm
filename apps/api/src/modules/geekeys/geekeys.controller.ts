import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { GeekeysService } from './geekeys.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.schema';
import { CreateGeekeyDto } from './dto/create-geekey.dto';
import { UpdateGeekeyDto } from './dto/update-geekey.dto';

@Controller('geekeys')
@UseGuards(JwtAuthGuard)
export class GeekeysController {
  constructor(private readonly geekeysService: GeekeysService) {}

  @Post()
  async createGeekey(@Body() createGeekeyDto: CreateGeekeyDto, @CurrentUser() user: User) {
    return this.geekeysService.createGeekey(createGeekeyDto, user._id.toString());
  }

  @Get()
  async getGeekeys(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.geekeysService.getGeekeys(page, limit);
  }

  @Get(':id')
  async getGeekey(@Param('id') id: string) {
    return this.geekeysService.getGeekey(id);
  }

  @Put(':id')
  async updateGeekey(
    @Param('id') id: string,
    @Body() updateGeekeyDto: UpdateGeekeyDto,
    @CurrentUser() user: User,
  ) {
    return this.geekeysService.updateGeekey(id, updateGeekeyDto, user._id.toString());
  }

  @Delete(':id')
  async deleteGeekey(@Param('id') id: string, @CurrentUser() user: User) {
    return this.geekeysService.deleteGeekey(id, user._id.toString());
  }

  @Post(':id/join')
  async joinGeekey(@Param('id') id: string, @CurrentUser() user: User) {
    return this.geekeysService.joinGeekey(id, user._id.toString());
  }

  @Post(':id/leave')
  async leaveGeekey(@Param('id') id: string, @CurrentUser() user: User) {
    return this.geekeysService.leaveGeekey(id, user._id.toString());
  }

  @Post(':id/invite/:userId')
  async inviteUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.geekeysService.inviteUser(id, userId, user._id.toString());
  }

  @Post(':id/quest')
  async createQuest(
    @Param('id') id: string,
    @Body() createQuestDto: any,
    @CurrentUser() user: User,
  ) {
    return this.geekeysService.createQuest(id, createQuestDto, user._id.toString());
  }

  @Post(':id/quest/:questId/complete')
  async completeQuest(
    @Param('id') id: string,
    @Param('questId') questId: string,
    @CurrentUser() user: User,
  ) {
    return this.geekeysService.completeQuest(id, questId, user._id.toString());
  }
} 