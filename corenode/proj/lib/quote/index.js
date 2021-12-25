const fs = require('fs');

const quote = {};

quote.allQuote = function allQuote() {
    const fileContent = fs.readFileSync(`${__dirname}/quote.txt`, 'utf-8');
    const arrayOfQuote = fileContent.split(/\r?\n/);
    return arrayOfQuote;
};
module.exports = quote;
