import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';

@Module({
  imports: [DiscordModule.forFeature()],
  controllers: [BotController],
  providers: [BotGateway,BotService]
})
export class BotModule {}
