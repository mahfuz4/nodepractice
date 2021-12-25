/*
 * Title:
 * Descripton:
 * Author:
 * Date:
 */

// Dependency
const mathLibrary = require('./lib/math');
const quotsLibrary = require('./quots/indax');

console.log(mathLibrary.getRednomNumber(3, 14));
// App object - Module Scaffolding
const app = {};

// Configuration

app.config = {
    timeBetweenQuote: 1000,
};
// Function that prints a rendom quote
app.printAquote = function printAQuote() {
    // Get all the quotes
    const allQuots = quotsLibrary.allQuots();

    // Get the length of this quote
    const quotsLength = allQuots.length;
    // Pick the rendom number between 1 and the number of the quotes
    const getRednomNumber = mathLibrary.getRednomNumber(1, quotsLength);
    // Get the quote at the position in the array (minus one)
    const selectQuots = allQuots[getRednomNumber - 1];
    // print the quote to the console.
    console.log(selectQuots);
};
// Function that loops indefinitely, calling the printAQuote function as it goes
app.infinityLoop = function infinityLoop() {
    // Create the interval, using the config variable defined above
    setInterval(app.printAquote, app.config.timeBetweenQuote);
};
// Invoke the loop
app.infinityLoop();
