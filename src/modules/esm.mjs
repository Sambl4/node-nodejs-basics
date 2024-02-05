import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const random = Math.random();

export let unknownObject;

if (random > 0.5) {
    unknownObject = JSON.parse(fs.readFileSync(`${ dirname }/files/a.json`).toString());
} else {
    unknownObject = JSON.parse(fs.readFileSync(`${ dirname }/files/b.json`).toString());
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${filename}`);
console.log(`Path to current directory is ${dirname}`);

export const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});
