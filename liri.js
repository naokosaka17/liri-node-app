var userInput = [];

var argv = process.argv;
for (var i = 3; i<argv.length; i++) {
	userInput.push(argv[i]);
}
var song = userInput.join(' ');


if (argv[2] === "my-tweet"){
	mytweets();
// } else if (argv[2] === "spotify-this-song" && ){

} else if (argv[2] === "spotify-this-song"){
	thisSong(song);
} else if (argv[2] === "movie-this" && song == ""){
	movieThis("Mr. Nobody");
} else if (argv[2] === "movie-this"){
 	movieThis(song);
} else if (argv[2] === "do-what-it-says"){
 	randomtxt();
}


//************  twitter  ************//

function mytweets(){
	var keys = require("./keys.js");
	var Twitter = require("twitter");

	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {screen_name: 'NaopuNao', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
	  		for (var i=0; i<tweets.length; i++) {
	    	console.log(tweets[i].text);
	  		}
		}
	});
}

//************  spotify  *************//

function thisSong(s){
	var spotify = require('spotify');

	spotify.search({ type: 'track', query: s }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 	
	var dta = data.tracks.items[0];
	 	//artists
		console.log(dta.artists[0].name);

		//name of song
		console.log(dta.name);

		//A preview link of the song from Spotify
		console.log(dta.preview_url);

		//The album that the song is from
		console.log(dta.album.name)

	});
};

//************  Return  **************//

function movieThis(movie) {
	var request = require('request');

	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	  	var jpb = JSON.parse(body);
	  	//Title of movie
	    console.log("Title: " + jpb.Title);
	    //Year the movie came out
	    console.log("Year: " + jpb.Year);
	    //IMDB Rating of the movie
	    console.log("Rating: " + jpb.imdbRating);
	    //Country where the movie was produced.
	    console.log("Country: " + jpb.Country);
		//Language of the movie.
		console.log("Language: " + jpb.Language);
		//Plot of the movie.
		console.log("Plot: " + jpb.Plot);
		//Actors in the movie.
		console.log("Actors: " + jpb.Actors);
		//Rotten Tomatoes Rating.
		console.log("Tomatoes Rating: " + jpb.tomatoRating);
		//Rotten Tomatoes URL.
		console.log("Tomatoes URL: "+ jpb.tomatoURL);

	  }
	});
};

//*********  do-what-itsays  **********//

function randomtxt(){

fs = require('fs');

fs.readFile('random.txt', 'utf8', function (err,data) {
  var output = data.split(',');

  thisSong(output[1]);

});

}


