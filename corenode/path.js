const path = require('path');

const myPath = '/c/mmm/mode.js';
// const ps = '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin';
// const pabs = path.basename(myPath);
// const paex = path.extname(myPath);
// console.log(path.extname(myPath));
// console.log(ps.split(path.delimiter));
console.log(path.format(path.parse(myPath)));
console.log(path.isAbsolute(myPath));
console.log(path.join('/ds/d', myPath));
