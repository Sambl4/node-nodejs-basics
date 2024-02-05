import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToRemove = 'fileToRemove.txt';
const errorMsg = 'FS operation failed';

const remove = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToRemoveExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToRemove}`);

    if(!isTargetFolderExists || !isFileToRemoveExists) {
        throw new Error(errorMsg);
    }

    fs.rm(
        `${dirname}/${targetFolderName}/${fileToRemove}`,
        { recursive:true },
        (err) => {
            if (err) {
                throw new Error(err);
            }
        }
    )
};

await remove();
