import type { IPlayerRequest, PlayerEndpointOptions } from '../../types/index.js';

export const PATH = '/player';

/**
 * Builds a `/player` request payload.
 * @param opts - The options to use.
 * @returns The payload.
 */
export function build(opts: PlayerEndpointOptions): IPlayerRequest {
console.log("PlayerEndpoint.build opts", opts);
  return {
    playbackContext: {
      contentPlaybackContext: {
        vis: 0,
        splay: false,
        referer: opts.playlist_id ?
          `https://www.youtube.com/watch?v=${opts.video_id}&list=${opts.playlist_id}` :
          `https://www.youtube.com/watch?v=${opts.video_id}`,
        currentUrl: opts.playlist_id ?
          `/watch?v=${opts.video_id}&list=${opts.playlist_id}` :
          `/watch?v=${opts.video_id}`,
        autonavState: 'STATE_ON',
        autoCaptionsDefaultOn: false,
        html5Preference: 'HTML5_PREF_WANTS',
        lactMilliseconds: '-1',
        ...{
          signatureTimestamp: opts.sts
        }
      }
    },
    attestationRequest: {
      omitBotguardData: true
    },
    racyCheckOk: true,
    contentCheckOk: true,
    videoId: opts.video_id,
    ...{
      client: opts.client,
      playlistId: opts.playlist_id,
      params: opts.params,
      serviceIntegrityDimensions: {
        // poToken: opts.po_token || ''
        poToken: 'MnQYZMBGJ9W-VxhcXkBTMWUcwYeokDuDRWDiZ-VEFuNgKwPS4KHAevnqQKUWd1Olwo_XZr4ng3B-Wx3rbS4uD1CgrGyzpIMi29kB2C_MpV5X0Uhqe_7Ip-DceCt6XgpIivSvXkmPF3C_4Czoc3yJ62FKTFSAdQ=='
      }
    }
  };
}
