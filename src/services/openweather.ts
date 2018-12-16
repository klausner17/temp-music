import dotenv from "dotenv";
import { WeatherData } from '../models/WeatherData';
import got from "got";

dotenv.config();
const weatherKey = process.env.OPENWEATHER_KEY;
const urlWeather = "https://api.openweathermap.org/data/2.5/weather?";

export function getTemperatureByCity(city: string): Promise<number> {
    let urlComposite = urlWeather + `q=${city}&APPID=${weatherKey}`;
    return got(encodeURI(urlComposite), {json: true})
        .then(json => {
            const KELVIN_CONST = 273.15;
            let tempCelsius = json.body.main.temp - KELVIN_CONST;
            return tempCelsius;
    });
}