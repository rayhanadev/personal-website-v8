import { defineAction } from "astro:actions";
import {
    SpotifyApi,
    type Track,
    type TrackItem,
} from "@spotify/web-api-ts-sdk";

export const spotify = {
    get: defineAction({
        handler: async (_, ctx) => {
            const { env } = ctx.locals.runtime;

            const token = await getSpotifyAccessToken({
                clientId: env.SPOTIFY_CLIENT_ID,
                clientSecret: env.SPOTIFY_CLIENT_SECRET,
                refreshToken: env.SPOTIFY_REFRESH_TOKEN,
            });

            const sdk = SpotifyApi.withAccessToken(env.SPOTIFY_CLIENT_ID, {
                access_token: token,
                token_type: "Bearer",
                expires_in: 3600,
                refresh_token: env.SPOTIFY_REFRESH_TOKEN,
            });

            const playback = await sdk.player.getCurrentlyPlayingTrack();

            if (
                !playback ||
                !playback.item ||
                !playback.is_playing ||
                !isTrack(playback.item)
                // playback.item.explicit
            ) {
                return null;
            }

            const track = playback.item;
            const song = cleanTitle(track.name);
            const artist =
                track.artists.length > 1
                    ? track.artists.length > 2
                        ? `${track.artists[0]?.name} and ${track.artists.length - 1} others`
                        : `${track.artists[0]?.name} and ${track.artists[1]?.name}`
                    : track.artists[0]?.name || "Unknown Artist";

            return { song, artist };
        },
    }),
};

async function getSpotifyAccessToken({
    clientId,
    clientSecret,
    refreshToken,
}: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}) {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
    });

    const data = (await res.json()) as Record<string, any>;
    return data.access_token;
}

function isTrack(track: TrackItem): track is Track {
    return (track as Track).type === "track";
}

function cleanTitle(title: string): string {
    return title
        .replace(/[-–—]\s*feat\..*$/i, "") // remove "- feat. ..."
        .replace(/\(feat\..*?\)/i, "") // remove "(feat. ...)"
        .replace(/\(.*?version.*?\)/i, "") // remove (some version)
        .replace(/\(from .*?\)/i, "") // remove (From Movie Name)
        .replace(/\(.*remaster.*\)/i, "") // remove (Remastered 20XX)
        .replace(/\s+/g, " ") // normalize whitespace
        .trim();
}
