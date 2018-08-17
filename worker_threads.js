(async () => {
    'use strict';

    const { Worker } = require('worker_threads');

    const arrayCnt = 10000000;
    const workerCnt = require('os').cpus().length;
    const range = (arrayCnt / workerCnt);
    const initialTime = new Date();
    let finishCnt = 0;
    let allShaResult = [];

    const mainFun = () => {
        for (let i = 0; i < workerCnt; i++) {
            const worker = new Worker('./res/wt_worker.js', {
                workerData: { id: i }
            });
        
            worker.on('message', (msg) => {
                // get sha256 result from each worker
                const { shaResult } = msg;
                allShaResult.push(shaResult);
    
                console.log(`[worker ${worker.threadId} finish]`);
    
                finishCnt++;
                totalTime += runTime;
                // merge all sha256 result
                if (finishCnt === workerCnt) {
                    allShaResult = [].concat(...allShaResult);
    
                    const now = new Date();
                    console.log(`All workers are finish. Total time: ${now - initialTime} ms`);
    
                    process.exit(0);
                }
            });
            worker.postMessage({ range });
        }
    };

    setTimeout(mainFun, 3000);
})();