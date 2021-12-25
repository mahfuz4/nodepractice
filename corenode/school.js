const EventEmitter = require('events');

// const emitter = new EventEmitter();
class School extends EventEmitter {
    startPeriod() {
        console.log('This period is started');

        // raise an event

        setTimeout(() => {
            this.emit('bellRing', {
                period: 'second',
                text: 'priod ended',
            });
        }, 2000);
    }
}

module.exports = School;
