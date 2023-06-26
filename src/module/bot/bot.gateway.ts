import { Injectable, UseInterceptors} from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import {PrefixCommandInterceptor} from '@discord-nestjs/common';
import { Client, Message } from 'discord.js';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class BotGateway {

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly logger: LoggerService
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  @UseInterceptors(new PrefixCommandInterceptor('start'))
  async onMessage(message: Message): Promise<string> {
    console.log("========= Message ===========",message)
    return 'Message processed successfully';
  }
}