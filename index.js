"use strict";
const start = new Date();
const { spawn } = require('child_process');
let argv = process.argv;
if (argv.length > 2) {
    argv = argv.slice(2);
    const npm = spawn('npm', argv);
    npm.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    npm.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    npm.on('close', (code) => {
        const end = new Date();
        let timeDiff = (end.valueOf() - start.valueOf())/ 60000;
        timeDiff = timeDiff.toFixed(2);
        console.log('npm runtime: ' + timeDiff + ' minutes');
    });
} else {
    console.error('Missing args. Nothing run.');
}

