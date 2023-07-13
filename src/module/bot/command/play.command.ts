
import { COMMAND_ERROR, INTERNAL_ERROR } from 'src/common/constant/error.constant';
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
import { isValidHttpUrl } from 'src/common/utils';
import { LoggerService } from 'src/module/logger/logger.service';

@Injectable()
@Command(COMMAND.PLAY)
@UseInterceptors(CollectorInterceptor)
export class PlayCommand {
  constructor(private readonly distube: DistubeService, private readonly logger: LoggerService) {}

  @Handler()
  async onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: PlayDto,
    @IA() interaction: CommandInteraction,
  ){
    try {
      this.logger.log("before defer")
      await interaction.deferReply({ ephemeral: true })
      this.logger.log("after derfer")
      const member: GuildMember = await interaction.guild.members.fetch({ user: interaction.user });
      const channel: VoiceBasedChannel = member.voice.channel
      if(!channel)
          return await interaction.editReply({ content: COMMAND_ERROR.NOT_IN_CHANNEL })

      this.logger.log("before play")
      
      if(isValidHttpUrl(dto.song)) {
        await this.distube.play(channel, dto.song)
        return await interaction.editReply({ content: `${PLAY_MUSIC} ${dto.song}`})
      } 

      const results = await this.distube.search(dto.song)
      await this.distube.play(channel, results[0])
      this.logger.log("after play")
      return await interaction.editReply({ content: `${PLAY_MUSIC} ${results[0].name} - ${results[0].source} \n ${results[0].url}` })
      
    } catch (e) {
      this.logger.error(e)
      return INTERNAL_ERROR
    }
  }
}