import SoundCloudPlugin from '@distube/soundcloud';
import SpotifyPlugin, { SpotifyPluginOptions } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { Injectable, Optional  } from '@nestjs/common';

@Injectable()
export class SoundcloudService extends SoundCloudPlugin {}

@Injectable()
export class YoutubeService extends YtDlpPlugin {}

@Injectable()
export class SpotifyService extends SpotifyPlugin {
    constructor(@Optional() option: SpotifyPluginOptions) {
        const config: SpotifyPluginOptions = {
            emitEventsAfterFetching: true,
            ...option
        }
        super(config)
    }
}
