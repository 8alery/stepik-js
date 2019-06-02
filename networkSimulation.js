
const processBatch = (bufferSize, packets) => {

    const queue = [];
    const processingLog = [];

    let currentTime = 0;

    for (let i = 0; i < packets.length; i++){

        const { arrival, duration } = packets[i];

        currentTime = arrival;

        //try processing queue
        while (queue.length && queue[0].start + queue[0].duration <= currentTime){
            queue.shift();
        }

        //Try to add packet to queue
        if (queue.length < bufferSize){
            const lastQueued = queue[queue.length - 1];
            const item = { start: lastQueued ? lastQueued.start + lastQueued.duration : currentTime, duration };
            processingLog[i] = item.start;
            queue.push(item);
        } else {
            processingLog[i] = -1;
        }
    }

    return processingLog;

};

const prepareParams = (lines) => {
    const [bufferSize, length] = lines[0].split(' ').map(el => parseInt(el));
    const packets = lines.slice(1, length + 1).map(line => {
        const [arrival, duration] = line.split(' ').map(el => parseInt(el, 10));
        return { arrival, duration };
    });
    return { bufferSize, packets };
};

const runTest =  () => {
    const testData = [
        [['1 0'], ''],
        [['1 1', '0 0'], '0'],
        [['1 2', '0 1', '0 1'], '0 -1'],
        [['1 2', '0 1', '1 1'], '0 1'],
        [['2 8', '0 0', '0 0', '0 0', '1 0', '1 0', '1 1', '1 2', '1 3'], '0 0 0 1 1 1 2 -1'],
        [['1 5', '999999 1', '1000000 0', '1000000 1', '1000000 0', '1000000 0'], '999999 1000000 1000000 -1 -1'],
        [['2 6', '0 2', '0 0', '2 0', '3 0', '4 0', '5 0'], '0 2 2 3 4 5'],
        [['1 5',
        '999999 1',
        '1000000 0',
        '1000000 1',
        '1000000 0',
        '1000000 0'], '999999 1000000 1000000 -1 -1'],
        [['1 5',
        '99 1',
        '100 0',
        '100 1',
        '100 0',
        '100 0'], '99 100 100 -1 -1'],
        [['1 2',
        '0 0',
        '0 0'], '0 0']


    ];

    const bufferSize = 10000;
    const length = 10000;
    const bigData = [`${bufferSize} ${length}`];
    for (let i = 0; i < length; i++){
        bigData.push(`${i} 10000`);
    }

    testData.push([bigData, '']);

    testData.forEach(data => {
        const { bufferSize, packets } = prepareParams(data[0]);
        const result = processBatch(bufferSize, packets).join(' ');
        console.log('Input: ', data);
        console.log('Output: ', result, result === data[1] ? ' match' : ', but should be ' + data[1]);
    });


};

runTest();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (input) => {
    lines.push(input);
}).on('close', () => {
    const { bufferSize, packets } = prepareParams(lines);
    const result = processBatch(bufferSize, packets);
    console.log(result.join('\n'));
    process.exit(0);
});


