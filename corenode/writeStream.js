const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`, 'utf8');
// ourReadStream.on('data', (chank) => {
//     ourWriteStream.write(chank);
// });

ourReadStream.pipe(ourWriteStream);

console.log('hello');
