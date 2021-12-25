const fs = require('fs');

// console.log();
fs.writeFileSync('mahfuz.txt', 'hi! i am a programmer');
fs.appendFileSync('mahfuz.txt', ' & I am fine too');

// const read = fs.readFileSync('mahfuz.txt');
// console.log(read.toString());
fs.readFile('mahfuz.txt', (err, data) => {
    console.log(data.toString());
});
