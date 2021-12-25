const fs = require('fs');

const quots = {};

quots.allQuots = function allQuots() {
    const fileContent = fs.readFileSync(`${__dirname}/quots.txt`, 'utf-8');
    const arrayOfQuote = fileContent.split(/\r?\n/);
    return arrayOfQuote;
};

// Export quote library
module.exports = quots;
