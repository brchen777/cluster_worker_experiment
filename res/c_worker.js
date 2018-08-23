(async () => {
    'use strict';

    process.send(`Worker ${process.env.id} init.`);
})();