import { PreviousCommand } from './command/previous.command';
import { SkipCommand } from './command/skip.command';
import { SkipToCommand } from './command/skipto.command';
import { RepeatCommand } from './command/repeat.command';
import { DistubeModule } from 'src/common/providers/distube/distube.module';
import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { PlaylistCommand } from './command/playlist.command';
import { PlayCommand } from './command/play.command';
import { BotGateway } from './bot.gateway';
import { HelpCommand } from './command/help.command';
import { LoggerModule } from '../logger/logger.module';
import { PauseCommand } from './command/pause.comman';
import { ResumeCommand } from './command/resume.command';

@Module({
  imports: [DiscordModule.forFeature(), LoggerModule, DistubeModule],
  providers: [BotGateway, PlayCommand, PlaylistCommand, HelpCommand, PauseCommand, ResumeCommand, RepeatCommand, SkipToCommand, SkipCommand, PreviousCommand],
  exports: [BotGateway]
})
export class BotModule {}
