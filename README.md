# Temp Music
## How to execute
#### Docker
Run the command specifying your credentials:
```
docker run -it -p 3000:3000 -e "OPENWEATHER_KEY=YOUR_KEY" -e "SPOTIFY_CLIENTE_ID=YOUR_CLIENTEID" -e "SPOTIFY_CLIENTE_SECRET=YOUR_SECRET" klausner/temp-music:temp-music
```
#### NPM
Create a file .env with yours credentials and run the commands:
```
npm install -g typescript
npm install
tsc
npm start
```

## Endpoint
The only endpoint available is http://localhost:3000/musicByTemp/:search. The parameter [search] can be a city or coordinates.
Examples:
[http://localhost:3000/musicByTemp/campinas](http://localhost:3000/musicByTemp/campinas)

[http://localhost:3000/musicByTemp/-22.0033,-47.888](http://localhost:3000/musicByTemp/-22.0033,-47.888)
