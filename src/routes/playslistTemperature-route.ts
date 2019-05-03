import express, { Request, Response, Router } from "express";
import { getTemperatureByCity, getTemperatureByCoord } from '../services/openweather';
import { getPlaylistByTemperature } from "../services/spotify";
import { PlaylistTemperature } from '../models/PlayslistTemperature';
import { sendError } from "../utils/response-error-utils";
import { Buffer } from "buffer";


var route = express.Router();

// função que simplifica a resposta de saída.
function formatOutput(playlist: any, temperature: number): PlaylistTemperature {
    let playlistNames = [];
    for (let i = 0; i < playlist.body.tracks.items.length; i++) {
        const track = playlist.body.tracks.items[i];
        playlistNames.push(track.name);
    }
    let playlistTemperature: PlaylistTemperature = {
        temperature: temperature,
        playlist: playlistNames
    }
    return playlistTemperature;
}

// rota principal que procura a playlist de acordo com a temperatura.
route.get('/musicByTemp/:search', (req: Request, res: Response) => {
    // verifica se é uma pesquisa por cidade ou uma pesquisa por coordenadas.
    const regexLatLon: RegExp = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/;
    const search: string = req.params.search;
    let searchMode = regexLatLon.test(search) ? getTemperatureByCoord : getTemperatureByCity;
    searchMode(search)
        .then((temperature: number) => {
            getPlaylistByTemperature(temperature)
                .then((playlist: any) => {
                    let playlistTemperature = formatOutput(playlist, temperature);
                    res.status(200).json(playlistTemperature);
                })
                .catch((error: any) => {
                    sendError(error, "Failed to search playlist", 500, res);
                });
        })
        .catch((error: any) => {
            sendError(error, "Failed to search localization", 500, res);
        })
});

route.get("/geocode/json", (_, res: Response) => {
    console.log(`Rand: ${Math.random()}`)
    let response = `
    {
        "results" : [
           {
              "address_components" : [
                 {
                    "long_name" : "1600",
                    "short_name" : "1600",
                    "types" : [ "street_number" ]
                 },
                 {
                    "long_name" : "Amphitheatre Pkwy",
                    "short_name" : "Amphitheatre Pkwy",
                    "types" : [ "route" ]
                 },
                 {
                    "long_name" : "Mountain View",
                    "short_name" : "Mountain View",
                    "types" : [ "locality", "political" ]
                 },
                 {
                    "long_name" : "Santa Clara County",
                    "short_name" : "Santa Clara County",
                    "types" : [ "administrative_area_level_2", "political" ]
                 },
                 {
                    "long_name" : "California",
                    "short_name" : "CA",
                    "types" : [ "administrative_area_level_1", "political" ]
                 },
                 {
                    "long_name" : "United States",
                    "short_name" : "US",
                    "types" : [ "country", "political" ]
                 },
                 {
                    "long_name" : "94043",
                    "short_name" : "94043",
                    "types" : [ "postal_code" ]
                 }
              ],
              "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
              "geometry" : {
                 "location" : {
                    "lat" : 37.4224764,
                    "lng" : -122.0842499
                 },
                 "location_type" : "ROOFTOP",
                 "viewport" : {
                    "northeast" : {
                       "lat" : 37.4238253802915,
                       "lng" : -122.0829009197085
                    },
                    "southwest" : {
                       "lat" : 37.4211274197085,
                       "lng" : -122.0855988802915
                    }
                 }
              },
              "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
              "types" : [ "street_address" ]
           }
        ],
        "status" : "OK"
     }`
    setTimeout(() => res.status(200).json(JSON.parse(response)), 300);
    
})

export default route; 