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
    let category: string;
    if (temperature < 10) category = "classical"
    else if (temperature < 15) category = "rock"
    else if (temperature <= 30) category = "pop"
    else category = "party";
    spotify.searchTracks(category)
        .then((result: any) => {
            result.body.tracks.items.forEach((element: any) => {
                console.log(element.name);    
            });
            
        })
        .catch((err: any) => {
            console.log(err);
        });
}