import { ConfigService } from '@nestjs/config';
import { DiscordModuleAsyncOptions, DiscordModuleOption } from "@discord-nestjs/core";
import { GatewayIntentBits } from 'discord.js';

export const discordConfig: DiscordModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            token: configService.get<string>('discord.token'),
            discordClientOptions: {
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.MessageContent
                ]
            },
            // autoLogin: true,
        }
    }
}