import SpotifyWebApi from "spotify-web-api-js";

export let spotifyApi = new SpotifyWebApi()

export const initSpotifyApi = token => {
    spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token)
}

export const getUserPlaylists = () => {
    return spotifyApi.getUserPlaylists()
}