import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const targetFileName = 'fresh.txt';
const fileContent = 'I am fresh and young';
const errorMsg = 'FS operation failed';

const create = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isTargetFileExists = fs.existsSync(`${dirname}/${targetFolderName}/${targetFileName}`);

    if(!isTargetFolderExists) {
        fs.mkdir(
            path.join(dirname, targetFolderName),
            (err) => {
                if (err) {
                    throw new Error(err);
                }
            }
        );
    }

    if(isTargetFileExists) {
        throw new Error(errorMsg);
    }

    fs.appendFile(
        `${dirname}/${targetFolderName}/${targetFileName}`,
        fileContent,
        (err) => {
            if(err) {
                throw new Error(err);
            }
        }
    );
};

await create();
