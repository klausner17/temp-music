import dotenv from "dotenv";
import { SpotifyGrant } from '../models/SpotifyGrant';
var SpotifyWebApi = require('spotify-web-api-node');

dotenv.config();

const SPOTIFY_ID = process.env.SPOTIFY_CLIENTE_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_CLIENTE_SECRET;

var spotify = new SpotifyWebApi({
    clientId: SPOTIFY_ID,
    clientSecret: SPOTIFY_SECRET
});

export async function getTrackByTemperature(temperature: number) {
    let data = await spotify.clientCredentialsGrant();
    let grant = <SpotifyGrant>data.body;
    spotify.setAccessToken(grant.access_token);
    let genre: string;
    if (temperature < 10) genre = "classical"
    else if (temperature < 15) genre = "rock"
    else if (temperature <= 30) genre = "pop"
    else genre = "party";
    const offset = Math.floor((Math.random() * 1000)) + 1;
    return spotify.searchTracks(`genre:${genre}`, {offset: offset});
}