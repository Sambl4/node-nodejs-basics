import { Transform } from 'stream';

const transform = async () => {
    const transformStream = new Transform({
        transform(data, enc, cb) {
            const transformedData = data
                .toString()
                .split('')
                .reverse()
                .join('');

            cb(null, transformedData);
        }
    });
    process.stdin.pipe(transformStream).pipe(process.stdout);
};

await transform();
