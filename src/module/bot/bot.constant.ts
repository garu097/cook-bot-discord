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
    },
    REPEAT: {
        name: 'repeat',
        description: 'Repeat current song',
    },
    SKIP: {
        name: 'skip',
        description: 'Skip the song playing'
    },
    PREVIOUS: {
        name: 'previous',
        description: 'Play the song previous'
    },
    SKIP_TO: {
        name: 'skipto',
        description: 'Skip to the number song you want in playlist'
    }
}

export const PREFIX_HELP_COMMAND: string = 'Welcome to the help bot! Here are some available commands:\n'

export enum EModeRepeat {
    Off = 'off',
    Song = 'song',
    Queue = 'queue'
}