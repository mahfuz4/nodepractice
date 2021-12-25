/*
 * title:
 * description:
 * Author:
 * Date:
 */

// Dependency
const mathLib = require('./lib/math');
const quoteLib = require('./lib/quote');
// App object
const app = {};

// Configuration
app.configuration = {
    timeBetweenQuote: 1000,
};

// function that print a rendom quote

app.printAQuote = function printAQuote() {
    const quoteFile = quoteLib.allQuote();
    const quoteArrayLength = quoteFile.length;
    const randomNumber = mathLib.getRendomNumber(1, quoteArrayLength);
    const singleQuote = quoteFile[randomNumber - 1];
    console.log(singleQuote);
};

app.infiniatyLoop = function infiniatyLoop() {
    setInterval(app.printAQuote, app.configuration.timeBetweenQuote);
};
app.infiniatyLoop();
