(async () => {
    'use strict';

    const { Worker } = require('worker_threads');

    // const workerCnt = require('os').cpus().length;
    const workerCnt = 512;

    const main = (() => {
        for (let i = 0; i < workerCnt; i++) {
            const worker = new Worker('./res/wt_worker.js', {
                workerData: { id: i + 1 }
            });

            worker.on('message', (msg) => {
                console.log(msg);
            });
        }

        console.log(`All worker are forked.`);
    })();
})();