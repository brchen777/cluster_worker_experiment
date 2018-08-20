(async () => {
    'use strict';

    const cluster = require('cluster');

    // const workerCnt = require('os').cpus().length;
    const workerCnt = 1536;

    const main = () => {
        for (let i = 0; i < workerCnt; i++) {
            cluster.setupMaster({
                cwd: './res',
                exec: './c_worker.js'
            });
            const worker = cluster.fork({ id: i + 1 });
        }

        console.log(`All worker are forked.`);
    };
    main();
})();


