import { Client } from 'discord.js';
import { DisTube, DisTubeOptions } from 'distube';
import { Injectable } from '@nestjs/common';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { YoutubeService, SpotifyService, SoundcloudService } from './distube-plugin.service';


@Injectable()
export class DistubeService extends DisTube {
    constructor(@InjectDiscordClient() readonly client: Client, 
                    private readonly youtube: YoutubeService,
                    private readonly soundCloud: SoundcloudService,
                    private readonly spotify: SpotifyService ) {

        const configDistube: DisTubeOptions= {
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [youtube, soundCloud, spotify]
        }

        super(client, configDistube)
    }
}
