import { COMMAND } from './../bot.constant';
import { Command, Handler, IA } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { COMMAND_ERROR, INTERNAL_ERROR } from 'src/common/constant/error.constant';
import { LIST_MUSIC } from 'src/common/constant/message.constant';
import { LoggerService } from 'src/module/logger/logger.service';

@Command(COMMAND.PLAY_LIST)
@Injectable()
export class PlaylistCommand {
  constructor(private readonly distube: DistubeService, private readonly logger: LoggerService) {}

  @Handler() 
  onPlaylist(@IA() interaction: CommandInteraction) {
    try {
      const queue = this.distube.getQueue(interaction.channel)
      if (!queue) return interaction.reply({ content : COMMAND_ERROR.EMPTY_QUEUE, ephemeral: true })
      const q = queue.songs
        .map((song, i) => `${i === 0 ? '\n- Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')
      return `${LIST_MUSIC} ${q}`;
    } catch (e) {
      this.logger.error(e)
      return INTERNAL_ERROR
    }
  }
}