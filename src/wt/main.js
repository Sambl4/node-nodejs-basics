import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const threads = new Set();
const result = new Map();
const startNumber = 10;

const performCalculations = async () => {
    const workerThreadsNumber = os.cpus().length;

    for(let i = 0; i < workerThreadsNumber; i++) {
        threads.add(createWorker(i, i + startNumber));
        result.set(i, { status: 'pending', data: null });
    }
};

await performCalculations();

function createWorker(workerId, n) {
    const worker = new Worker(`${dirname}/worker.js`, { workerData: { workerId: workerId, data: n } });

    worker.on('error', (err) => {
        if (err) {
            result.set(workerId, { status: 'error', data: null });
        }
    });

    worker.on('message', (msg) => {
        const {workerId, status, data} = msg;

        result.set(workerId, { status: status, data: data });
    });

    worker.on('exit', () => {
        threads.delete(worker);
        if (threads.size === 0) {
          console.log(Array.from(result.values()));
        }
    });

    return worker;
}
