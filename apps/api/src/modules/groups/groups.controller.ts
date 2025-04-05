import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.createGroup(createGroupDto, user._id.toString());
  }

  @Get()
  async getGroups(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.groupsService.getGroups(page, limit);
  }

  @Get(':id')
  async getGroup(@Param('id') id: string) {
    return this.groupsService.getGroup(id);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.updateGroup(
      id,
      updateGroupDto,
      user._id.toString(),
    );
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string, @CurrentUser() user: User) {
    return this.groupsService.deleteGroup(id, user._id.toString());
  }

  @Post(':id/join')
  async joinGroup(@Param('id') id: string, @CurrentUser() user: User) {
    return this.groupsService.joinGroup(id, user._id.toString());
  }

  @Post(':id/leave')
  async leaveGroup(@Param('id') id: string, @CurrentUser() user: User) {
    return this.groupsService.leaveGroup(id, user._id.toString());
  }

  @Post(':id/moderators/:userId')
  async addModerator(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.addModerator(id, userId, user._id.toString());
  }

  @Delete(':id/moderators/:userId')
  async removeModerator(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.removeModerator(id, userId, user._id.toString());
  }

  @Post(':id/ban/:userId')
  banUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.banUser(id, userId, user._id.toString());
  }

  @Delete(':id/ban/:userId')
  unbanUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.unbanUser(id, userId, user._id.toString());
  }
}
