import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToCompress = 'fileToCompress.txt';
const archiveFileName = 'archive.gz';

const decompress = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToCompressExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToCompress}`);
    const isArchiveFileNameExists = fs.existsSync(`${dirname}/${targetFolderName}/${archiveFileName}`);

    if(!isTargetFolderExists || !isFileToCompressExists || !isArchiveFileNameExists) {
        throw new Error(errorMsg);
    }

    const unzip  = zlib.createGunzip();
    const readStream = fs.createReadStream(`${dirname}/${targetFolderName}/${archiveFileName}`);
    const writeStream = fs.createWriteStream(`${dirname}/${targetFolderName}/${fileToCompress}`);

    readStream.pipe(unzip).pipe(writeStream);
};

await decompress();
