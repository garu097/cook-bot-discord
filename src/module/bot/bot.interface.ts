import { ChatInputCommandOptions } from "@discord-nestjs/core"

export type ICommand = {
    [x: string]: ChatInputCommandOptions
}
