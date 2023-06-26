import { discordConfig } from './common/config/discord-module.config';
import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { BotModule } from './module/bot/bot.module';
import { LoggerModule } from './module/logger/logger.module';
import enviromenConfig from './common/config/enviromen.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [enviromenConfig],
      isGlobal: true
    }),
    DiscordModule.forRootAsync(discordConfig),
    BotModule,
    LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
