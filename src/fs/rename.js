import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const wrongFilename = 'wrongFilename.txt';
const properFilename = 'properFilename.md';
const errorMsg = 'FS operation failed';

const rename = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isWrongFileExists = fs.existsSync(`${dirname}/${targetFolderName}/${wrongFilename}`);
    const isProperFileExists = fs.existsSync(`${dirname}/${targetFolderName}/${properFilename}`);

    if(!isTargetFolderExists || !isWrongFileExists || isProperFileExists) {
        throw new Error(errorMsg);
    }

    fs.rename(
        `${dirname}/${targetFolderName}/${wrongFilename}`,
        `${dirname}/${targetFolderName}/${properFilename}`,
        (err) => {
            if (err) {
                throw new Error(err);
            }
        }
    );
};

await rename();
