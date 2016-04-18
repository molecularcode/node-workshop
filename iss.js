// Ex2 - Getting some data
// -----------------------------------------

// Create a file called iss.js. In it, write a simple node program that will output the latitude and longitude of the International Space Station.
// Practice your google-fu by searching for "iss api" and figuring out the correct URL to use. Hint: there are many options and they are all good :)
// Notice that the values provided by the API are very precise. Round off the values to two decimal digits for a nicer display. Hint: toFixed


// > npm install request
var request = require('request');
var url = "http://api.open-notify.org/iss-now.json";

request(url, function(err, result) {
    var resultObject = JSON.parse(result.body);
    var latitude = resultObject.iss_position.latitude.toFixed(2);
    var longitude = resultObject.iss_position.longitude.toFixed(2);   
    var theDate = new Date(resultObject.timestamp * 1000);
    var timeDate = theDate.toGMTString();
    console.log ("At " + timeDate + ", the International Space Station was at " + latitude + " latitude and " + longitude + " longitude!");
});