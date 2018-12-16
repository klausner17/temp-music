import { Temperature } from "./Temperature";
import { Coordinates } from './Coordinates';

export interface WeatherData {
    coord: Coordinates;
    main: Temperature;
    callback: Function;
}