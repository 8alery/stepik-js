const preparePatams = (lines) => {
    const length = lines[0] - 0;

    const items = lines[1].split(' ').map(el => el-0);

    const window = lines[2] - 0;

    return { window, items };

};


const findMax = (items, window) => {
    const result = [];

    const queue = [];

    for (let i = 0; i < items.length; i++){

        const lastQueued = queue.length ? queue[queue.length - 1] : -1;
        const max = Math.max(lastQueued, items[i]);

        queue.push(max);
        if (queue.length >= window){
            result.push(max);
            queue.shift();
        }

    }

    return result;
};

const runTests = () => {
    const testData = [
        ['8',
        '2 7 3 1 5 2 6 2',
        '4']
    ];

    testData.forEach(data => {
        const { window, items } = preparePatams(data);
        const result = findMax(items, window);
        console.log('Input: ', data);
        console.log('Output: ', result.join(' '));
    });
};

runTests();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
rl.on('line', (input) => {
    lines.push(input);
}).on('close', () => {
    const queries = preparePatams(lines);
    const result = processor(queries);
    console.log(result.join('\n'));
    process.exit(0);
});