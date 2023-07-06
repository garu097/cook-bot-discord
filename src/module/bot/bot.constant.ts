import { ICommand } from "./bot.interface"

export const COMMAND:ICommand = {
    HELP : {
        name: 'help',
        description: 'List all command'
    },
    PLAY: {
        name: 'play',
        description: 'Plays a song',
    },
    PLAY_LIST: {
        name: 'playlist',
        description: 'Get current playlist',
    },
    PAUSE: {
        name: 'pause',
        description: 'Pause current song',
    },
    RESUME: {
        name: 'resume',
        description: 'Resume current song',
    }
}

export const PREFIX_HELP_COMMAND: string = 'Welcome to the help bot! Here are some available commands:\n'