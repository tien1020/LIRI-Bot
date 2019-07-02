require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys")

var spotify = new Spotify(keys.spotify);

var userInput = process.argv.slice(3).join(" ");
var userCommand = process.argv[2];

switch (userCommand) {
    case "spotify-this-song":
        findSpotify();
        break;

}

function findSpotify() {
    spotify.search({ type: "track", query: userInput }, function (err, response) {
        if (err) {
            return console.log(err)
        }

        //  console.log(JSON.stringify(data,null,2));


        if (response.tracks.items[0] === undefined) {
          
          spotify.search({type: "track", query:"The Sign" }, function(err,response){
            for (var i = 0; i < response.tracks.items[5].album.artists.length; i++) {
                console.log(
                    "Artist:", response.tracks.items[5].album.artists[i].name, " \n",
                    "Song:", response.tracks.items[5].album.name, " \n",
                    "URL:", response.tracks.items[5].album.external_urls.spotify, " \n",
                    "Album source:", response.tracks.items[5].album.artists[i].name, " \n",
                )
            }
                
          })
        }
        else {
            for (var i = 0; i < response.tracks.items[0].album.artists.length; i++) {
                console.log(
                    "Artist:", response.tracks.items[0].album.artists[i].name, " \n",
                    "Song:", response.tracks.items[0].album.name, " \n",
                    "URL:", response.tracks.items[0].album.external_urls.spotify, " \n",
                    "Album source:", response.tracks.items[0].album.artists[i].name, " \n",
                )
            }
        }

    })

}

