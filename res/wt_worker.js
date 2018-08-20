(async () => {
    'use strict';

    const { parentPort, workerData } = require('worker_threads');

    console.log(`Worker ${workerData.id} init.`);

    // for delay
    parentPort.on('message', (msg) => {
        console.log(msg);
    });
})();