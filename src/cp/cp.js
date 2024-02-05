import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const scriptFile = 'script.js';

const spawnChildProcess = async (args) => {
    const child = spawn(
        'node',
        [`${dirname}/${targetFolderName}/${scriptFile}`, ...args],
    );

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['someArgument1', 'someArgument2', 'someArgument3']);
