import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from './group.schema';
import { User } from '../users/user.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto, ownerId: string) {
    const group = new this.groupModel({
      ...createGroupDto,
      ownerId: new Types.ObjectId(ownerId),
      members: [new Types.ObjectId(ownerId)],
      moderators: [],
    });
    return group.save();
  }

  async getGroups(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [groups, total] = await Promise.all([
      this.groupModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate('ownerId', 'username displayName avatar')
        .populate('members', 'username displayName avatar')
        .populate('moderators', 'username displayName avatar')
        .exec(),
      this.groupModel.countDocuments(),
    ]);

    return {
      groups,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getGroup(id: string) {
    const group = await this.groupModel
      .findById(id)
      .populate('ownerId', 'username displayName avatar')
      .populate('members', 'username displayName avatar')
      .populate('moderators', 'username displayName avatar')
      .exec();

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
    userId: string,
  ) {
    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.ownerId.toString() !== userId) {
      throw new UnauthorizedException('Only the owner can update the group');
    }

    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true });
  }

  async deleteGroup(id: string, userId: string) {
    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.ownerId.toString() !== userId) {
      throw new UnauthorizedException('Only the owner can delete the group');
    }

    return this.groupModel.findByIdAndDelete(id);
  }

  async joinGroup(id: string, userId: string) {
    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    if (group.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException('You are already a member of this group');
    }

    group.members.push(userIdObj);
    group.memberCount += 1;
    return group.save();
  }

  async leaveGroup(id: string, userId: string) {
    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (!group.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException('You are not a member of this group');
    }

    if (group.ownerId.toString() === userId) {
      throw new UnauthorizedException('The owner cannot leave the group');
    }

    group.members = group.members.filter(
      (member) => member.toString() !== userId,
    );
    group.memberCount -= 1;
    return group.save();
  }

  async addModerator(id: string, userId: string, requesterId: string) {
    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.ownerId.toString() !== requesterId) {
      throw new UnauthorizedException('Only the owner can add moderators');
    }

    const userIdObj = new Types.ObjectId(userId);
    if (group.moderators.some((mod) => mod.toString() === userId)) {
      throw new UnauthorizedException('User is already a moderator');
    }

    if (!group.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException(
        'User must be a member to become a moderator',
      );
    }

    group.moderators.push(userIdObj);
    return group.save();
  }

  async removeModerator(id: string, userId: string, requesterId: string) {
    const group = await this.groupModel.findById(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.ownerId.toString() !== requesterId) {
      throw new UnauthorizedException('Only the owner can remove moderators');
    }

    group.moderators = group.moderators.filter(
      (mod) => mod.toString() !== userId,
    );
    return group.save();
  }

  async banUser(groupId: string, userId: string, requesterId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.ownerId.toString() !== requesterId) {
      throw new UnauthorizedException('Only the owner can ban users');
    }

    const userIdObj = new Types.ObjectId(userId);
    if (!group.members.includes(userIdObj)) {
      throw new UnauthorizedException('User is not a member of this group');
    }

    group.members = group.members.filter(
      (member) => member.toString() !== userId,
    );
    return group.save();
  }

  async unbanUser(groupId: string, userId: string, requesterId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.ownerId.toString() !== requesterId) {
      throw new UnauthorizedException('Only the owner can unban users');
    }

    // Check if the user is not already a member
    const userIdObj = new Types.ObjectId(userId);
    if (group.members.includes(userIdObj)) {
      throw new UnauthorizedException('User is already a member of this group');
    }

    // Add the user back to the members list
    group.members.push(new Types.ObjectId(userId));
    return group.save();
  }
}
