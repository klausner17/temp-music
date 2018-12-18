import dotenv from "dotenv";
import { SpotifyGrant } from '../models/SpotifyGrant';
var SpotifyWebApi = require('spotify-web-api-node');

dotenv.config();

// Chaves da api do spotify
const SPOTIFY_ID = process.env.SPOTIFY_CLIENTE_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_CLIENTE_SECRET;

var spotify = new SpotifyWebApi({
    clientId: SPOTIFY_ID,
    clientSecret: SPOTIFY_SECRET
});

// função que busca uma playlist por temperatura
export async function getPlaylistByTemperature(temperature: number) {
    // criar uma credencial. precisa melhorar essa parte para pegar de hora em hora.
    let data = await spotify.clientCredentialsGrant();
    let grant = <SpotifyGrant>data.body;
    spotify.setAccessToken(grant.access_token);
    let genre: string;
    // definir qual é o genero da música de scordo com a temperatura
    if (temperature < 10) genre = "classical"
    else if (temperature < 15) genre = "rock"
    else if (temperature <= 30) genre = "pop"
    else genre = "party";
    // offset aleatório para sempre trazer musicas diferentes
    const offset = Math.floor((Math.random() * 1000)) + 1;
    // procurar musica de acordo com o genero.
    return spotify.searchTracks(`genre:${genre}`, {offset: offset});
}