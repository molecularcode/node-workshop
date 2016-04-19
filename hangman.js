// Ex5 - Challenge: Hangman!
// -----------------------------------------

// Create a file called hangman.js.
// In this file, write a program that will let the user play hangman. The program should work as follows:

// - Choose a random word from a list of words.
// - In a loop, do the following:
//   - Ask the user to guess a letter
//   - If the user guessed a wrong letter, then add one step to the hangman "drawing"
//   - Display the current completion of the word next to a hangman ASCII "drawing". You can get some inspiration from either here or here
//   - Keep looping until either the word is found or the hangman is hanged!
// - Display a message to the user letting them know what happened

// > npm install prompt
var prompt = require('prompt');
prompt.start();
var randomWord = ["protype", "asynchronous", "primative", "closure", "variable", "javascript"];
var chosenWordLetterArray = [];
var wrongAnswers = [];
var guesses = [];
var x = 0;

// Ascii hangman array
var hangman = [
    "   _______",
    "  |/      |",
    "  |      (_)",    
    "  |      \\|/",    
    "  |       |",    
    "  |      / \\",
    "  |",
    " _|___"
    ];
var hangMan = [];

// Pick a random word from the randomWord array and split it in to an array of letters
function findRandomWord(randomWord) {
    var randIndex = Math.floor(Math.random()*randomWord.length);
    var chosenWord = randomWord[randIndex];
    chosenWordLetterArray = chosenWord.split('');
    chosenWordLetterArray.forEach(function(blanks) {
        guesses.push("_");
    });
}

function promptLetter() {
    for (var i = 0; wrongAnswers.length < hangman.length; i++) { // keep going until they run out of guesses i.e. all the hangman lines have printed
        while(chosenWordLetterArray.join('') !== guesses.join('')) { // keep going whilst they've not guessed the correct answer
            return prompt.get(["letter"], function(err, result) { // prompt the user for a letter
                if (typeof result.letter === "string" && result.letter.match(/[a-z]/i) && result.letter.length === 1) { // in the letter is in the word, push it to the guesses array and replace the _ placeholder
                    if (chosenWordLetterArray.indexOf(result.letter) !== -1) {
                        chosenWordLetterArray.forEach(function(letter, int) {
                            if (letter === result.letter) {
                                guesses.splice(int, 1, letter);
                            }
                        });
                    }
                    else { // if the letter is not in the array, keep track of it in the wrong answers array
                        console.log("try again");
                        wrongAnswers.push(result.letter);
                        hangMan = hangMan.concat(hangman[x])+"\n";
                        x++;
                    }
                    // do stuff after the user has entered a letter and it's been evaluated as either right or wrong
                    console.log(hangMan);
                    console.log(guesses);
                    console.log("You've entered " + wrongAnswers.length + " wrong answers");
                    promptLetter();
                }
                else {
                    console.log("You did not enter a valid, single letter, please try again!");
                }
            });
        }
        if(wrongAnswers.length < 2) {
            console.log("Wow, you're awesomel, you made that look easy!");
        }
        else if (wrongAnswers.length > 2 && wrongAnswers.length < 7 ) {
            console.log("Congrats, you win!");
        }
        else {
            console.log("You won by the skin of your teeth");
        }
        return;
    }
    console.log("That's too many! Better luck next time.");
    console.log(hangMan);
}

findRandomWord(randomWord);
console.log(guesses);
promptLetter(chosenWordLetterArray);