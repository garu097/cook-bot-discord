import { RESUME_MUSIC } from './../../../common/constant/message.constant';
import { COMMAND_ERROR } from './../../../common/constant/error.constant';
import { CommandInteraction } from 'discord.js';
import { CollectorInterceptor } from '@discord-nestjs/common';
import { COMMAND } from './../bot.constant';
import { Command, Handler, IA } from "@discord-nestjs/core";
import { Injectable, UseInterceptors } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';

@Injectable()
@Command(COMMAND.RESUME)
@UseInterceptors(CollectorInterceptor)

export class ResumeCommand {
    constructor(private readonly distube: DistubeService){}

    @Handler()
    async onResume(
    @IA() interaction: CommandInteraction) {
        const queue = this.distube.getQueue(interaction.channel)
        if(!queue) return await interaction.reply({ content: COMMAND_ERROR.EMPTY_QUEUE })
        if(!queue.paused) return await interaction.reply({ content: COMMAND_ERROR.NOT_PAUSE })
        queue.resume()
        return await interaction.reply({ content: RESUME_MUSIC })
    }
}