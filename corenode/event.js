const School = require('./school');

const school = new School();

// register a lsitener for a bell ring event
school.on('bellRing', ({ period, text }) => {
    console.log(`we need to run! ${period} ${text}`);
});

// raise an event
// event listen korte hobe then rase korte hobe
// setTimeout(() => {
//     emitter.emit('bellRing', {
//         period: 'second',
//         text: 'priod ended',
//     });
// }, 2000);

school.startPeriod();
