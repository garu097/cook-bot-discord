import { COMMAND } from './../bot.constant';
import { Command, Handler } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";
import { DistubeService } from 'src/common/providers/distube/distube.service';
import { LoggerService } from 'src/module/logger/logger.service';
import { INTERNAL_ERROR } from 'src/common/constant/error.constant';

@Injectable()
@Command(COMMAND.VOLUME)
export class HelpCommand { 
    constructor(private readonly distube:DistubeService, private readonly logger: LoggerService){}

    @Handler()
    onVolume () {
        try {

        } catch (e) {
            this.logger.error(e)
            return INTERNAL_ERROR
        }
    }

}