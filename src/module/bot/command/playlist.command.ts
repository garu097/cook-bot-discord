import { COMMAND } from './../bot.constant';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { COMMAND_ERROR } from 'src/common/constant/error.constant';
import { LIST_MUSIC } from 'src/common/constant/message.constant';

@Command(COMMAND.PLAY_LIST)
@Injectable()
export class PlaylistCommand {
  constructor(private readonly distube: DistubeService) {}

  @Handler() 
  onPlaylist(@IA() interaction: CommandInteraction) {
    const queue = this.distube.getQueue(interaction.channel)
    if (!queue) return interaction.reply({ content : COMMAND_ERROR.EMPTY_QUEUE, ephemeral: true })
    const q = queue.songs
      .map((song, i) => `${i === 0 ? '\n- Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    return `${LIST_MUSIC} ${q}`;
  }
}