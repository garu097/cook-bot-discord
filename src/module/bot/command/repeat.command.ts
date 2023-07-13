import { REPEAT_QUEUE, REPEAT_SONG, REPEAT_OFF } from 'src/common/constant/message.constant';
import { COMMAND_ERROR } from 'src/common/constant/error.constant';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { COMMAND, EModeRepeat } from './../bot.constant';
import { Command, Handler, IA, InteractionEvent } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { SlashCommandPipe, CollectorInterceptor } from '@discord-nestjs/common';
import { RepeatDto } from '../dto/repeat.dto';

@Command(COMMAND.REPEAT)
@Injectable()
@UseInterceptors(CollectorInterceptor)

export class RepeatCommand {
    constructor(private readonly distube: DistubeService) {}
  @Handler() 
  async onPlaylist( @InteractionEvent(SlashCommandPipe) dto: RepeatDto,@IA() interaction: CommandInteraction){
    const queue = this.distube.getQueue(interaction.channel)
    if(!queue) return await interaction.reply({ content: COMMAND_ERROR.EMPTY_QUEUE, ephemeral: true })
    let mode
    switch (dto.mode) {
        case EModeRepeat.Off:
            mode = 0
            break;
        case EModeRepeat.Queue:
            mode = 2
            break;
        default:
            mode = 1     // repeat current song
            break;
    }
    mode = queue.setRepeatMode(mode)
    const mess = mode ? (mode === 2 ? REPEAT_QUEUE : REPEAT_SONG) : REPEAT_OFF
    return await interaction.reply({ content: mess, ephemeral: true  })
  }
}