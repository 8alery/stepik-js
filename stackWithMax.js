const preparePatams = (lines) => {
    const queriesCount = parseInt(lines[0], 10);

    const queries = lines.slice(1, queriesCount + 1).map(line => {
        line = line.split(' ');
        const command = line[0];
        const args = line.slice(1);
        return {
            command,
            args
        };
    });

    return queries;

};


const processor = (queries) => {
    const stack = [];
    const stackMax = [];

    let log = [];

    for (let i = 0; i < queries.length; i++){

        const query = queries[i];

        if (query.command === 'push'){
            const key = query.args[0] - 0;
            stack.push(key);
            const max = Math.max(stackMax.length ? stackMax[stackMax.length - 1] : -1, key);
            stackMax.push(max);
        } else if (query.command === 'pop'){
            stack.pop();
            stackMax.pop();
        } else if (query.command === 'max'){
            log.push(stackMax[stackMax.length - 1]);
        }
    }

    return log;
};

const runTests = () => {
    const testData = [
        ['3',
        'push 1',
        'push 7',
        'pop'],
        ['5',
        'push 2',
        'push 1',
        'max',
        'pop',
        'max']
    ];

    testData.forEach(data => {
        const queries = preparePatams(data);
        const result = processor(queries);
        console.log('Input: ', data);
        console.log('Output: ', result.join('\n'));
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