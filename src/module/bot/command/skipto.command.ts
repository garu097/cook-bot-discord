
import { COMMAND_ERROR } from 'src/common/constant/error.constant';
import { CommandInteraction } from 'discord.js';
import { CollectorInterceptor, SlashCommandPipe } from '@discord-nestjs/common';
import { COMMAND } from './../bot.constant';
import { Command, Handler, IA, InteractionEvent } from "@discord-nestjs/core";
import { Injectable, UseInterceptors } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { SkipToDto } from '../dto/skipto.dto';
import { SKIP_SONG } from 'src/common/constant/message.constant';

@Injectable()
@Command(COMMAND.SKIP_TO)
@UseInterceptors(CollectorInterceptor)

export class SkipToCommand {
    constructor(private readonly distube: DistubeService){}

    @Handler()
    async onSkipTo(
    @IA() interaction: CommandInteraction,
    @InteractionEvent(SlashCommandPipe) dto: SkipToDto) {
        await interaction.deferReply({ ephemeral: true })
        const queue = this.distube.getQueue(interaction.channel)
        if(!queue) return await interaction.editReply({ content: COMMAND_ERROR.EMPTY_QUEUE })
        
        const num = Number(dto.i)
        if(isNaN(num)) return await interaction.editReply({ content: COMMAND_ERROR.EMPTY_QUEUE })
        const song = await this.distube.jump(interaction.channel, num)

        return  await interaction.editReply({ content: `${SKIP_SONG}${song.name}` })
    }
}