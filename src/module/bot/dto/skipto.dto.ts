import { Param } from "@discord-nestjs/core";
import { Transform } from "class-transformer";

export class SkipToDto {
    @Param({
        name: 'i',
        description:
          'Name or URL of song/playlist. Could be from (Youtube, Spotify, SoundCloud)',
        required: true,
      })
      i: string;
}