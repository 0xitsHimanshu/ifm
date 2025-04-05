import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Geekey } from './geekey.schema';
import { User } from '../users/user.schema';
import { CreateGeekeyDto } from './dto/create-geekey.dto';
import { UpdateGeekeyDto } from './dto/update-geekey.dto';

@Injectable()
export class GeekeysService {
  constructor(
    @InjectModel(Geekey.name) private geekeyModel: Model<Geekey>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createGeekey(createGeekeyDto: CreateGeekeyDto, ownerId: string) {
    const geekey = new this.geekeyModel({
      ...createGeekeyDto,
      ownerId: new Types.ObjectId(ownerId),
      members: [new Types.ObjectId(ownerId)],
      stats: {
        totalXP: 0,
        totalLevels: 0,
        totalMembers: 1,
        totalQuests: 0,
      },
    });
    return geekey.save();
  }

  async getGeekeys(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [geekeys, total] = await Promise.all([
      this.geekeyModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate('ownerId', 'username displayName avatar')
        .populate('members', 'username displayName avatar')
        .exec(),
      this.geekeyModel.countDocuments(),
    ]);

    return {
      geekeys,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getGeekey(id: string) {
    const geekey = await this.geekeyModel
      .findById(id)
      .populate('ownerId', 'username displayName avatar')
      .populate('members', 'username displayName avatar')
      .exec();

    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    return geekey;
  }

  async updateGeekey(
    id: string,
    updateGeekeyDto: UpdateGeekeyDto,
    userId: string,
  ) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    if (geekey.ownerId.toString() !== userId) {
      throw new UnauthorizedException('Only the owner can update the geekey');
    }

    return this.geekeyModel.findByIdAndUpdate(id, updateGeekeyDto, {
      new: true,
    });
  }

  async deleteGeekey(id: string, userId: string) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    if (geekey.ownerId.toString() !== userId) {
      throw new UnauthorizedException('Only the owner can delete the geekey');
    }

    return this.geekeyModel.findByIdAndDelete(id);
  }

  async joinGeekey(id: string, userId: string) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    if (geekey.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException(
        'You are already a member of this geekey',
      );
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (geekey.requirements.invitationOnly) {
      throw new UnauthorizedException('This geekey is invitation only');
    }

    if (geekey.requirements.level && user.level < geekey.requirements.level) {
      throw new UnauthorizedException('You do not meet the level requirement');
    }

    if (geekey.requirements.rpg && user.rpg < geekey.requirements.rpg) {
      throw new UnauthorizedException('You do not meet the RPG requirement');
    }

    geekey.members.push(userIdObj);
    geekey.memberCount += 1;
    geekey.stats.totalMembers += 1;
    return geekey.save();
  }

  async leaveGeekey(id: string, userId: string) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    if (!geekey.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException('You are not a member of this geekey');
    }

    if (geekey.ownerId.toString() === userId) {
      throw new UnauthorizedException('The owner cannot leave the geekey');
    }

    geekey.members = geekey.members.filter(
      (member) => member.toString() !== userId,
    );
    geekey.memberCount -= 1;
    geekey.stats.totalMembers -= 1;
    return geekey.save();
  }

  async inviteUser(id: string, userId: string, requesterId: string) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    if (geekey.ownerId.toString() !== requesterId) {
      throw new UnauthorizedException('Only the owner can invite users');
    }

    const userIdObj = new Types.ObjectId(userId);
    if (geekey.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException('User is already a member');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (geekey.requirements.level && user.level < geekey.requirements.level) {
      throw new UnauthorizedException(
        'User does not meet the level requirement',
      );
    }

    if (geekey.requirements.rpg && user.rpg < geekey.requirements.rpg) {
      throw new UnauthorizedException('User does not meet the RPG requirement');
    }

    geekey.members.push(userIdObj);
    geekey.memberCount += 1;
    geekey.stats.totalMembers += 1;
    return geekey.save();
  }

  async createQuest(id: string, createQuestDto: any, userId: string) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    if (geekey.ownerId.toString() !== userId) {
      throw new UnauthorizedException('Only the owner can create quests');
    }

    const quest = {
      ...createQuestDto,
      id: Date.now().toString(),
      createdAt: new Date(),
      completedBy: [],
    };

    if (!geekey.quests) {
      geekey.quests = [];
    }
    geekey.quests.push(quest);
    geekey.stats.totalQuests += 1;
    return geekey.save();
  }

  async completeQuest(id: string, questId: string, userId: string) {
    const geekey = await this.geekeyModel.findById(id);
    if (!geekey) {
      throw new NotFoundException('Geekey not found');
    }

    if (!geekey.members.some((member) => member.toString() === userId)) {
      throw new UnauthorizedException('You are not a member of this geekey');
    }

    const quest = geekey.quests.find((q) => q.id === questId);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }

    if (quest.completedBy.some((user) => user.toString() === userId)) {
      throw new UnauthorizedException('You have already completed this quest');
    }

    quest.completedBy.push(new Types.ObjectId(userId));
    geekey.stats.totalXP += quest.rewards.xp || 0;
    geekey.stats.totalLevels += quest.rewards.coins || 0;
    return geekey.save();
  }
}
