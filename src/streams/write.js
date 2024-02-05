import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readLine from 'readline';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const targetFolderName = 'files';
const fileToWrite = 'fileToWrite.txt';

const write = async () => {
    const isTargetFolderExists = fs.existsSync(`${dirname}/${targetFolderName}`);
    const isFileToWriteExists = fs.existsSync(`${dirname}/${targetFolderName}/${fileToWrite}`);

    if(!isTargetFolderExists || !isFileToWriteExists) {
        throw new Error(errorMsg);
    }

    const stream = fs.createWriteStream(`${dirname}/${targetFolderName}/${fileToWrite}`);

    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'your text: \n',
    });

    rl.on('line', (input) => {
        stream.write(input + '\n');
    }).prompt();
};

await write();
