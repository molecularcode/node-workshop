// Ex1 - First program
// -----------------------------------------

// Create a file called hello-world.js . In it, write a simple node program that outputs "Hello World!" to the console.
// Add an instruction to your program that will output "Hello World Again!!" 10 seconds after the program was run.

setTimeout(function() {
    console.log("Hello World Again!!");
}, 10000);
console.log("Hello World");