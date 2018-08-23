(async () => {
    'use strict';

    const { parentPort, workerData } = require('worker_threads');

    parentPort.postMessage(`Worker ${workerData.id} init.`);

    // for delay
    parentPort.on('message', (msg) => {
    });
})();