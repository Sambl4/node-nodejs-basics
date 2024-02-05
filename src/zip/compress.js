import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToCompress = 'fileToCompress.txt';
const targetName = 'archive.gz';

const compress = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToCompressExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToCompress}`);

    if(!isTargetFolderExists || !isFileToCompressExists) {
        throw new Error(errorMsg);
    }

    const gzip = zlib.createGzip();
    const readStream = fs.createReadStream(`${dirname}/${targetFolderName}/${fileToCompress}`);
    const writeStream = fs.createWriteStream(`${dirname}/${targetFolderName}/${targetName}`);

    readStream.pipe(gzip).pipe(writeStream);
};

await compress();
