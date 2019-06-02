// put your javascript (node.js) code here
const isCyclic = (sequence) => {
    if (sequence.length % 2 !== 0){
        sequence = sequence.slice(0, sequence.length - 1);
    }

    const firstPart = sequence.slice(0, sequence.length / 2);
    const secondPart = sequence.slice(sequence.length / 2);

    return firstPart.join('') === secondPart.join('');

};

const pisanoPeriod = (n) => {
    if (n <= 1){
        return { period: 1, cycle: [0], zeroes: 1 };
    }


    let prev = 0;
    let current = 1;
    const sequence = [prev, current];

    let foundPeriod = false;

    while(!foundPeriod){
        [prev, current] = [current, (prev + current) % n];
        sequence.push(current);
        if (current === 0){
            foundPeriod = isCyclic(sequence);
        }
    }

    const cycle = sequence.slice(0, sequence.length / 2);
    const zeroes = cycle.filter(el => el === 0).length;
    return { period: cycle.length, zeroes, cycle };

};

const getRemainder = (n, m) => {
    const { period, cycle} = pisanoPeriod(m);
    const modForPeriod = BigInt(n) % BigInt(period);
    return cycle[modForPeriod];
};

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const numbers = input.split(' ');
    console.log(getRemainder(numbers[0], parseInt(numbers[1], 10)));
});





