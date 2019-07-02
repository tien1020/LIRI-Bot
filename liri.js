require("dotenv").config();
var NodeGeocoder = require("node-geocoder");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys");

// --------------Spotify-------------

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

// ---------------Movies------------

var movieInput=process.argv.slice(3).join(" ");
var userCommand = process.argv[2];

switch (userCommand) {
    case "movie-this":
        findMovie();
        break;

}

function findMovie(){

axios.get("http://www.omdbapi.com/?t=" + movieInput + "=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("Movie title: ", response.data.Title, "\n ",
                "Year: ", response.data.Year, "\n ",
                "Rating: ", response.data.imdbRating, "\n ",
                "Rotten Tomatoes: ", response.data.Ratings[1].Value, "\n ",
                "Country: ", response.data.Country, "\n ",
                "Language: ", response.data.Language, "\n ",
                "Plot: ", response.data.Plot, "\n ",
                "Actors: ", response.data.Actors, "\n ",
                );
  })
  .catch(function(error) {
    if (error.response) {
        
        axios.get("http://www.omdbapi.com/?t=Mr.Nobody=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("Movie title: ", response.data.Title, "\n ",
                "Year: ", response.data.Year, "\n ",
                "Rating: ", response.data.imdbRating, "\n ",
                "Rotten Tomatoes: ", response.data.Ratings[1].Value, "\n ",
                "Country: ", response.data.Country, "\n ",
                "Language: ", response.data.Language, "\n ",
                "Plot: ", response.data.Plot, "\n ",
                "Actors: ", response.data.Actors, "\n ",
                );
  })
      

    }else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

// ------------Concerts-----------

var artist=process.argv.slice(3).join(" ");
var userCommand = process.argv[2];

switch (userCommand) {
    case "concert-this":
        bandsInTown();
        break;

}

function bandsInTown(){

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log("Venue: ", response.data[i].venue.name, "\n ",
                "Location: ", response.data.Year, "\n ",
                "Event Date: ", response.data[i].datetime, "\n ",
                
                );
  })
}






