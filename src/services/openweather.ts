import dotenv from "dotenv";
import { WeatherData } from '../models/WeatherData';
import got from "got";

dotenv.config();
const weatherKey = process.env.OPENWEATHER_KEY;
const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";

// método para buscar temperatura por cidade
export function getTemperatureByCity(city: string): Promise<number> {
    let url = urlWeather + `q=${city}&APPID=${weatherKey}`;
    return makeRequestOpenWeather(url);
}

// método para buscar temperatura por coordenadas
export function getTemperatureByCoord(coord: string): Promise<number> {
    // dive a coordenada, separando lat e lon
    let searchSplit = coord.split(',');
    const lat = searchSplit[0];
    const lon = searchSplit[1];
    let url = urlWeather + `lat=${lat}&lon=${lon}&APPID=${weatherKey}`;
    return makeRequestOpenWeather(url);
}

// método responável por fazer o request para o openweather.
function makeRequestOpenWeather(url: string): Promise<number> {
    return got(encodeURI(url), {json: true})
        .then((json: any) => {
            // a temperatura vem em kelvin e é necessário converter para celsius.
            const KELVIN_CONST = 273.15;
            let tempCelsius = json.body.main.temp - KELVIN_CONST;
            return tempCelsius;
    });
}