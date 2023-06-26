import { COMMAND, PREFIX_HELP_COMMAND } from './../bot.constant';
import { Command, Handler } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";

@Injectable()
@Command(COMMAND.HELP)
export class HelpCommand { 
    @Handler()
    onHelp () {
        const message: string = Object.entries(COMMAND).reduce((acc, [_, value]) => {
            return acc + `- /${value.name}: ${value.description}\n` 
        }, PREFIX_HELP_COMMAND);
        return message
    }

}