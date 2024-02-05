import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToRead = 'fileToRead.txt';

const read = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToReadExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToRead}`);

    if(!isTargetFolderExists || !isFileToReadExists) {
        throw new Error(errorMsg);
    }

    const readStream = fs.createReadStream(`${dirname}/${targetFolderName}/${fileToRead}`);

    readStream.on('data', (chunk) => {
        process.stdout.write(`${chunk}`);
    });
};

await read();
