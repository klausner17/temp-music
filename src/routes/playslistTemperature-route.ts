import express, { Request, Response, Router } from "express";
import { getTemperatureByCity, getTemperatureByCoord } from '../services/openweather';
import { getTrackByTemperature } from "../services/spotify";
import { PlaylistTemperature } from '../models/PlayslistTemperature';
import { sendError } from "../utils/response-error-utils";


var route = express.Router();

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

route.get('/musicByTemp/:search', (req: Request, res: Response) => {
    const regexLatLon: RegExp = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/;
    const search: string = req.params.search;
    let searchMode = regexLatLon.test(search) ? getTemperatureByCoord : getTemperatureByCity;
    searchMode(search)
        .then((temperature: number) => {
            getTrackByTemperature(temperature)
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

export default route;