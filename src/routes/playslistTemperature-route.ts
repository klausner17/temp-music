import express, { Request, Response } from "express";
import { getTemperatureByCity } from "../services/openweather";
import { getTrackByTemperature } from "../services/spotify";
import { PlaylistTemperature } from '../models/PlayslistTemperature';


var route = express.Router();

route.get('/musicByTempCoord/:city', (req: Request, res: Response) => {
    const city: string = req.params.city;
    getTemperatureByCity(city)
        .then((temperature: number) => {
            getTrackByTemperature(temperature)
                .then((playlist: any) => {
                    let playlistNames = [];
                    for (let i = 0; i < playlist.body.tracks.items.length; i++) {
                        const track = playlist.body.tracks.items[i];
                        playlistNames.push(track.name);
                    }
                    let playlistTemperature: PlaylistTemperature = {
                        temperature: temperature,
                        playlist: playlistNames
                    }
                    res.status(200).json(playlistTemperature);
                })
                .catch((error: any) => {
                    res.status(500).json({msg: "Failed to search playlist."});
                    console.log(error);
                });
        })
        .catch((error: any) => {
            res.status(500).json({msg: "Failed to search temperature."});
            console.log(error);
        })
});

export default route;