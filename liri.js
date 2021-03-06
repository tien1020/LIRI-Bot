require("dotenv").config();
// var NodeGeocoder = require("node-geocoder");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var moment = require("moment");
var fs = require("fs");


// --------------Spotify-------------

var spotify = new Spotify(keys.spotify);

var userInput = process.argv.slice(3).join(" ");
var userCommand = process.argv[2];

switch (userCommand) {
    case "spotify-this-song":
        findSpotify(userInput);
        break;

}

function findSpotify(songName) {
    spotify.search({ type: "track", query: songName }, function (err, response) {
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
  .catch(function() {
   
        
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
})
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
      
    for (var i=0; i< response.data.length; i++){

    console.log(
   
        "Venue: ", response.data[i].venue.name, "\n ",
                "Location: ", response.data[i].venue.city + " " + response.data[i].venue.region + " " + response.data[i].venue.country + "\n" ,
                "Event Date: ", moment(response.data[i].datetime).format("MM/DD/YYYY") , "\n ",
                
                )};
  
})
.catch(function(){
  console.log("Error")
})
};


// ----------------do-what-it-says------------------

var artist=process.argv.slice(3).join(" ");
var userCommand = process.argv[2];

switch (userCommand) {
    case "do-what-it-says":
        doWhatItSay();
        break;

}

function doWhatItSay(){

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr[1]);
  findSpotify(dataArr[1]);


});
};






