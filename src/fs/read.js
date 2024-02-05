import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToRead = 'fileToRead.txt';
const errorMsg = 'FS operation failed';

const read = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToReadExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToRead}`);

    if(!isTargetFolderExists || !isFileToReadExists) {
        throw new Error(errorMsg);
    }

    fs.readFile(`${dirname}/${targetFolderName}/${fileToRead}`, 'utf8', (err, data) => {
        if (err) {
            throw new Error(err);
        }

        console.log(data);
    })
};

await read();
