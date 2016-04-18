// Ex3 - Augmenting our application
// -----------------------------------------

//  Create a file called iss-augmented.js. It will be similar to iss.js but more difficult!
//  Augment your ISS application to tell the user how "far" the ISS is from them. Here is how you will do it:
//  Using the prompt module, ask the user to enter their location (e.g. "montreal")
//  Using Google's Geolocation API, find out the latitude and longitude of the provided location. Here is how:
//  This URL: https://maps.googleapis.com/maps/api/geocode/json?address=montreal will show the lat/long for montreal
//  Explore this URL in your web browser to figure out where the lat/lng is located. Try to pass different values for "address" for educational purposes :)
//  When you are comfortable with finding the location based on an input address, you can then calculate the distance between the ISS and the user:
//  Look at this URL: http://www.movable-type.co.uk/scripts/latlong.html
//  It specifies a formula for calculating the distance. Scroll the page to the JavaScript portion, and create a function that uses the provided code. You don't need to understand what is going on in there, it is very mathy!
//  NOTE: In order for this code to work, you'll need to add the following code at the beginning of your program:

//  Number.prototype.toRadians = function() {
//     return this * Math.PI / 180;
//   }

//  Finally, display a message to the user telling them what their "distance" to the ISS is.


Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

// > npm install prompt
var prompt = require('prompt');
prompt.start();


// Calculate distance between ISS and user's location
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371000; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = (R * c) / 1000;
    return "You are currently " + d.toFixed(2) + " km away from the International Space Station!";
}

// Get the current position of the ISS
var request = require('request');
var url = "http://api.open-notify.org/iss-now.json";
var issLoc = "";
var issLat;
var issLon;
var myLat;
var myLon;

request(url, function(err, result) {
    var resultObject = JSON.parse(result.body);
    issLat = resultObject.iss_position.latitude.toFixed(2);
    issLon = resultObject.iss_position.longitude.toFixed(2);   
    var theDate = new Date(resultObject.timestamp * 1000);
    var timeDate = theDate.toGMTString();
    issLoc = "At " + timeDate + ", the International Space Station was at " + issLat + " latitude and " + issLon + " longitude! \n";
});


// Get the user's location
prompt.get(['locationCity'], function (err, result) {
    var loc = result.locationCity.toLowerCase().replace(/ /g, "%20"); // convert to lowercase and replace spaces
    // console.log(loc);
    var googleAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + loc;
    var request = require('request');
    
    request(googleAPI, function(err, result) {
        //console.log(result.body);
        var resultObject = JSON.parse(result.body);
        //console.log(resultObject.results[0]);
        myLat = resultObject.results[0].geometry.location.lat.toFixed(2);
        myLon = resultObject.results[0].geometry.location.lng.toFixed(2);
        console.log ("\nThe latitude of " + resultObject.results[0].formatted_address + " is " + myLat + " and the longitude is " + myLon + ".\n");
        console.log(issLoc);

        issLat = Number(issLat);
        issLon = Number(issLon);
        myLat = Number(myLat);
        myLat = Number(myLat);
        console.log(distance(issLat, issLon, myLat, myLon));
    });
});