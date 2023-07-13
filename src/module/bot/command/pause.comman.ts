import { COMMAND_ERROR, INTERNAL_ERROR } from 'src/common/constant/error.constant';
import { CommandInteraction } from 'discord.js';
import { CollectorInterceptor } from '@discord-nestjs/common';
import { COMMAND } from './../bot.constant';
import { Command, Handler, IA } from "@discord-nestjs/core";
import { Injectable, UseInterceptors } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { PAUSE_MUSIC } from 'src/common/constant/message.constant';
import { LoggerService } from 'src/module/logger/logger.service';

@Injectable()
@Command(COMMAND.PAUSE)
@UseInterceptors(CollectorInterceptor)

export class PauseCommand {
    constructor(private readonly distube: DistubeService, private readonly logger: LoggerService){}

    @Handler()
    async onPause(
    @IA() interaction: CommandInteraction) {
        try {
            const queue = this.distube.getQueue(interaction.channel)
            if(!queue) return await interaction.reply({ content: COMMAND_ERROR.EMPTY_QUEUE, ephemeral: true })
            if(queue.paused) return await interaction.reply({ content: COMMAND_ERROR.PAUSED_ALREADY, ephemeral: true })
            queue.pause()
            return await interaction.reply({ content: PAUSE_MUSIC, ephemeral: true })
        } catch (e) {
            this.logger.error(e)
            return INTERNAL_ERROR
        }
        
    }
}