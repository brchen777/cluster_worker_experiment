(async () => {
    'use strict';

    const { Worker } = require('worker_threads');

    const arrayCnt = 1000000;
    const workerCnt = require('os').cpus().length;
    const range = (arrayCnt / workerCnt);
    const initialTime = new Date();
    let finishCnt = 0;
    let totalTime = 0;
    let allShaResult = [];

    for (let i = 0; i < workerCnt; i++) {
        const worker = new Worker('./res/wt_worker.js', {
            workerData: { id: i }
        });
    
        worker.on('message', (msg) => {
            // get sha256 result from each worker
            const { shaResult } = msg;
            allShaResult.push(shaResult);

            const now = new Date();
            let runTime = now - initialTime;
            console.log(`[worker ${worker.threadId} finish]: ${runTime} ms`);

            finishCnt++;
            totalTime += runTime;
            // merge all sha256 result
            if (finishCnt === workerCnt) {
                allShaResult = [].concat(...allShaResult);
                console.log(`All workers are finish. Total time: ${totalTime} ms`);
                process.exit(0);
            }
        });
        worker.postMessage({ range });
    }
})();