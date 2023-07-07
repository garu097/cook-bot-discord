import { SKIP_SONG } from 'src/common/constant/message.constant';
import { COMMAND_ERROR } from 'src/common/constant/error.constant';
import { CommandInteraction } from 'discord.js';
import { CollectorInterceptor } from '@discord-nestjs/common';
import { COMMAND } from './../bot.constant';
import { Command, Handler, IA } from "@discord-nestjs/core";
import { Injectable, UseInterceptors } from '@nestjs/common';
import { DistubeService } from 'src/common/providers/distube/distube.service';

@Injectable()
@Command(COMMAND.SKIP)
@UseInterceptors(CollectorInterceptor)

export class SkipCommand {
    constructor(private readonly distube: DistubeService){}

    @Handler()
    async onSkip(
    @IA() interaction: CommandInteraction) {
        const queue = this.distube.getQueue(interaction.channel)
        if(!queue) return await interaction.reply({ content: COMMAND_ERROR.EMPTY_QUEUE, ephemeral: true })
        try {
            const song = await queue.skip()
            return await interaction.reply({content:`${SKIP_SONG}\n${song.name}`, ephemeral: true})
          } catch (e) {
            return interaction.reply(`${e}`)
          }
    }
}