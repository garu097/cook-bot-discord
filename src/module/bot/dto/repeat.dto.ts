import { Param } from "@discord-nestjs/core";
import { EModeRepeat } from "../bot.constant";

export class RepeatDto {
    @Param({
        name: 'mode',
        description: 'Mode repeat: off, song, list'
    })
    mode: EModeRepeat
}