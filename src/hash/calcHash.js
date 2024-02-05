import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToRead = 'fileToCalculateHashFor.txt';

const calculateHash = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToReadExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToRead}`);

    if(!isTargetFolderExists || !isFileToReadExists) {
        throw new Error(errorMsg);
    }

    const hash = createHash('sha256');

    const input = fs.createReadStream(`${dirname}/${targetFolderName}/${fileToRead}`);

    input
        .pipe(hash)
        .setEncoding('hex')
        .on('data', (chunk) => {
            process.stdout.write(`${chunk}`);
        });
};

await calculateHash();
