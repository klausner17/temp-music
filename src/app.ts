import { getTemperatureByCity } from "./services/openweather";
import { getTrackByTemperature } from "./services/spotify";

getTemperatureByCity("São Carlos")
    .then(result => console.log(result))
    .catch(err => {
        console.log(err);
    });

getTrackByTemperature(20);
