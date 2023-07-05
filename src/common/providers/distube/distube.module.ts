import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import {  SoundcloudService, SpotifyService, YoutubeService } from './distube-plugin.service';
import { DistubeService } from './distube.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [DistubeService, SpotifyService, SoundcloudService, YoutubeService],
  exports: [DistubeService]
})
export class DistubeModule {}
