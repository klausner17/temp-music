import express from "express";
import playlistTemperatureRoute from "./routes/playslistTemperature-route";

var app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(playlistTemperatureRoute);