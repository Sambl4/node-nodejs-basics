import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = ({ workerId, data }) => {
    parentPort.postMessage({
        workerId: workerId,
        status: 'resolved',
        data: nthFibonacci(data),
    });
};

sendResult(workerData);
