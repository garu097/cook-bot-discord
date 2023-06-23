import { ConfigService } from '@nestjs/config';
import { DiscordModuleAsyncOptions } from "@discord-nestjs/core";
import { GatewayIntentBits } from 'discord.js';

export const discordConfig: DiscordModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>('discord.token'))
        return {
            token: configService.get<string>('discord.token'),
            discordClientOptions: {
                intents: [GatewayIntentBits.Guilds]
            }
        }
    }
}