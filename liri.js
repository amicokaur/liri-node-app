require("dotenv").config();
var Spotify = require("node-spotify-api")
var request = require("request");
var keys = require('./keys.js');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var artist = process.argv[3]


function concertThis() {

    // Then run a request to the OMDB API with the movie specified
    // var artist = (process.argv[3])
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var listConcert = JSON.parse(body)
            console.log(listConcert.length)
            for (var i = 0; i < listConcert.length; i++) {
                console.log(listConcert[i].venue.name)
                console.log(listConcert[i].venue.city)
                console.log(listConcert[i].datetime)

            }
        }

    })

}
function movieThis() {

    // Then run a request to the OMDB API with the movie specified
    var movieTitle = (process.argv[3])
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The title of the movie is " + JSON.parse(body).Title);
            console.log("Year " + JSON.parse(body).Year);
            console.log("IMDB Rating " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced " + JSON.parse(body).Country);
            console.log("Language " + JSON.parse(body).Language);
            console.log("Plot " + JSON.parse(body).Plot);
            console.log("Actors " + JSON.parse(body).Actors);


        }
    });


}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {

        data = data.split(',');

        if (data[0] == 'spotify-this-song') {
            var song = data[1]
            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                //  console.log(data)
                var songItems = data.tracks.items;

                songItems.forEach(key => {
                    console.log(key.name)
                    console.log(key.artists[0].name)
                    console.log(key.album.name)
                    console.log(key.href)
                    console.log('----------------********************----------------')
                })
            });


        } else if (data[0] == 'concert-this') {
            var artist = data[1]
            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                    var listConcert = JSON.parse(body)
                    console.log(listConcert.length)
                    for (var i = 0; i < listConcert.length; i++) {
                        console.log(listConcert[i].venue.name)
                        console.log(listConcert[i].venue.city)
                        console.log(listConcert[i].datetime)

                    }
                }

            })

        } else if (data[0]=="movie-this")  {
            var movieTitle = data[1]
            request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The title of the movie is " + JSON.parse(body).Title);
            console.log("Year " + JSON.parse(body).Year);
            console.log("IMDB Rating " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced " + JSON.parse(body).Country);
            console.log("Language " + JSON.parse(body).Language);
            console.log("Plot " + JSON.parse(body).Plot);
            console.log("Actors " + JSON.parse(body).Actors);


        }
    })


        }


    })
}





function spotifyThisSong() {
    var song = process.argv[3]

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //  console.log(data)
        var songItems = data.tracks.items;

        songItems.forEach(key => {
            console.log(key.name)
            console.log(key.artists[0].name)
            console.log(key.album.name)
            console.log(key.href)
            console.log('----------------********************----------------')
        })
    });



}
if (process.argv[2] === 'concert-this') {
    concertThis()
} else if (process.argv[2] === 'spotify-this-song') {
    spotifyThisSong()
} else if (process.argv[2] === "movie-this") {
    movieThis()

} else if (process.argv[2] === 'do-what-it-says') {
    doWhatItSays()
}

