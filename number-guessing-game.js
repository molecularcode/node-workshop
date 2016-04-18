// Ex4 - Number guessing game!
// -----------------------------------------

// Create a file called number-guessing-game.js.
// In this file, re-write your number guessing game (from the basic javascript workshop - Penniless Gambler Challenge) for the command line!:
//      Generate a random number between 1 and 100. Using the browser functions prompt and alert, ask the user to guess the number. You should give them 4 tries to guess the number. If they guess wrong, tell them if it's higher or lower. If they guess right, congratulate them. Otherwise, give them a message saying what the correct number was, as well as their list of guesses.
// Instead of using prompt and alert, you will have to use capabilities from NodeJS and any external module. HINT: there is an npm library called prompt that can help you with that :)

// > npm install prompt
var prompt = require('prompt');
prompt.start();

var guessTheNum = Math.floor(Math.random()*(100)+1);
var i = 4;

function promptNumber() {
    return prompt.get(["number"], function(err, result) {
        if (!isNaN(result.number) && result.number > 0 && result.number < 101) {
            if(Number(result.number) !== guessTheNum){
                if (Number(result.number) > guessTheNum) {
                    console.log("You entered: " + result.number + ", this is too high, please try a lower number!");
                }
                else {
                    console.log("You entered: " + result.number + ", this is too low, please try a higher number!");
                }
                if (i > 1) {
                    i--;
                    promptNumber();
                }
                else {
                    console.log("Sorry, you took more than 4 turns to guess the answer, better luck next time");
                }
            } else {
                console.log("Congrats, you guessed the right number!");
            }
        }
        else {
            console.log("You did not enter a valid number, please try again! Your number should be between 1 - 100 exclusive");
        }
    });
}

promptNumber();