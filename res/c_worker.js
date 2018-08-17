(async () => {
    'use strict';

    const sha256 = require('sha256');

    process.on('message', (msg) => {
        let { range } = msg;
        const shaArray = [];
        while(range-- > 0) {
            const hexStr = sha256(Math.random().toString());
            shaArray.push(hexStr);
        }

        process.send({ id: process.env.id, shaResult: shaArray });
    });
})();