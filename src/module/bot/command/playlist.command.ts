import { COMMAND } from './../bot.constant';
import { Command, Handler } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';

@Command(COMMAND.PLAY_LIST)
@Injectable()
export class PlaylistCommand {
  @Handler() 
  onPlaylist(interaction: CommandInteraction): string {
    console.log(interaction)
    return 'List with music...';
  }
}