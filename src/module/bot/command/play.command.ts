
import { COMMAND_ERROR, INTERNAL_ERROR } from './../../../common/constant/error.constant';
import {  Injectable, UseInterceptors } from '@nestjs/common';
import { SlashCommandPipe, CollectorInterceptor } from '@discord-nestjs/common';

import {
  Command,
  Handler,
  IA,
  InteractionEvent,
} from '@discord-nestjs/core';
import { CommandInteraction, GuildMember, VoiceBasedChannel } from 'discord.js';
import { PlayDto } from '../dto/play.dto';
import { COMMAND } from '../bot.constant';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { PLAY_MUSIC } from 'src/common/constant/message.constant';

@Injectable()
@Command(COMMAND.PLAY)
@UseInterceptors(CollectorInterceptor)
export class PlayCommand {
  constructor(private readonly distube: DistubeService) {}

  @Handler()
  async onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: PlayDto,
    @IA() interaction: CommandInteraction,
  ){
    try {
      const member: GuildMember = await interaction.guild.members.fetch({ user: interaction.user });
      const channel: VoiceBasedChannel = member.voice.channel
      if(!channel)
          return await interaction.reply({ content: COMMAND_ERROR.NOT_IN_CHANNEL })

      const results = await this.distube.search(dto.song)
      this.distube.play(channel, results[0])

      return await interaction.reply({ content: `${PLAY_MUSIC} ${results[0].name}` })
    } catch (e) {
      console.log(e)
      return await interaction.channel.send(INTERNAL_ERROR)
    }
    
  }
}