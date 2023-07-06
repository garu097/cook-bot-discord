import { COMMAND_ERROR } from 'src/common/constant/error.constant';
import { CommandInteraction } from 'discord.js';
import { CollectorInterceptor } from '@discord-nestjs/common';
import { COMMAND } from './../bot.constant';
import { Command, Handler, IA } from "@discord-nestjs/core";
import { Injectable, UseInterceptors } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { PAUSE_MUSIC } from 'src/common/constant/message.constant';

@Injectable()
@Command(COMMAND.PAUSE)
@UseInterceptors(CollectorInterceptor)

export class PauseCommand {
    constructor(private readonly distube: DistubeService){}

    @Handler()
    async onPause(
    @IA() interaction: CommandInteraction) {
        const queue = this.distube.getQueue(interaction.channel)
        if(!queue) return await interaction.reply({ content: COMMAND_ERROR.EMPTY_QUEUE })
        if(queue.paused) return await interaction.reply({ content: COMMAND_ERROR.PAUSED_ALREADY })
        queue.pause()
        return await interaction.reply({ content: PAUSE_MUSIC })
    }
}