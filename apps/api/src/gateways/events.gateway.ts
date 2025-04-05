import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../modules/users/user.schema';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const user = await this.userModel.findById(token.sub);
      if (!user) {
        client.disconnect();
        return;
      }

      client.join(`user:${user._id}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Handle disconnection
  }

  @SubscribeMessage('campaign:progress')
  @UseGuards(JwtAuthGuard)
  async handleCampaignProgress(client: Socket, data: any) {
    const userId = client.handshake.auth.token.sub;
    this.server.to(`user:${userId}`).emit('campaign:progress', data);
  }

  @SubscribeMessage('wallet:transaction')
  @UseGuards(JwtAuthGuard)
  async handleWalletTransaction(client: Socket, data: any) {
    const userId = client.handshake.auth.token.sub;
    this.server.to(`user:${userId}`).emit('wallet:transaction', data);
  }

  @SubscribeMessage('user:levelup')
  @UseGuards(JwtAuthGuard)
  async handleUserLevelUp(client: Socket, data: any) {
    const userId = client.handshake.auth.token.sub;
    this.server.to(`user:${userId}`).emit('user:levelup', data);
  }

  @SubscribeMessage('notification:new')
  @UseGuards(JwtAuthGuard)
  async handleNewNotification(client: Socket, data: any) {
    const userId = client.handshake.auth.token.sub;
    this.server.to(`user:${userId}`).emit('notification:new', data);
  }
}
