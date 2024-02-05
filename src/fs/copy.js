import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const newFolderPostfix ='_copy';
const errorMsg = 'FS operation failed';

const copy = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isNewFolderExists = fs.existsSync(`${dirname}/${targetFolderName}${newFolderPostfix}`);

    if(!isTargetFolderExists || isNewFolderExists) {
        throw new Error(errorMsg);
    }

    fs.cp(
        `${dirname}/${targetFolderName}`,
        `${dirname}/${targetFolderName}${newFolderPostfix}`,
        { recursive: true },
        (err) => {
            if (err) {
                throw new Error(err);
            }
        }
    );
};

await copy();
