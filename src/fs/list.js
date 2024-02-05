import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const errorMsg = 'FS operation failed';

const list = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);

    if(!isTargetFolderExists) {
        throw new Error(errorMsg);
    }

    fs.readdir(`${dirname}/${targetFolderName}`, (err, files) => {
        if(err) {
            throw new Error(err);
        }

        console.table(files);
    });
};

await list();
