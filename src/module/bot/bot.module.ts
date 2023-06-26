
import { PlaylistCommand } from './command/playlist.command';
import { PlayCommand } from './command/play.command';
import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { HelpCommand } from './command/help.command';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [DiscordModule.forFeature(), LoggerModule],
  providers: [BotGateway, PlayCommand, PlaylistCommand, HelpCommand]
})
export class BotModule {}
