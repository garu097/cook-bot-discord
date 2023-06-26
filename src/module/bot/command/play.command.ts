import { Injectable, UseInterceptors } from '@nestjs/common';
import { SlashCommandPipe, CollectorInterceptor } from '@discord-nestjs/common';

import {
  Command,
  EventParams,
  Handler,
  IA,
  InteractionEvent,
  UseCollectors,
} from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { PlayDto } from '../dto/play.dto';
import { COMMAND } from '../bot.constant';

@Injectable()
@Command(COMMAND.PLAY)
@UseInterceptors(CollectorInterceptor)
export class PlayCommand {
  @Handler()
  onPlayCommand(
    // @InteractionEvent(SlashCommandPipe) dto: PlayDto,
    @IA(SlashCommandPipe) dto: PlayDto
  ){
    // console.log('DTO', dto);
    console.log('Event args', dto);

    return `Start playing .`;
  }
}