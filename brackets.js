const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const openBraces = ['(', '[', '{'];
const closeBraces = [')', ']', '}'];

const validateBraces = (str) => {
    const stack = [];
    for (let i = 0; i < str.length; i += 1){
        const openBraceIndex = openBraces.indexOf(str[i]);
        const closeBraceIndex = closeBraces.indexOf(str[i]);
        if (openBraceIndex !== -1){
            stack.push({ value: str[i], index: i });
        } else if (closeBraceIndex !== -1) {
            if (stack.length === 0){
                return i + 1;
            } 
            const previous = stack.pop();
            if (previous.value !== openBraces[closeBraceIndex]){
                return i + 1;
            }
        }
    }
    return stack.length === 0 ? 'Success' : stack.pop().index + 1;
};

rl.on('line', (input) => {
    console.log(validateBraces(input));
}).on('close', () => {
    process.exit(0);
});

// assert(validateBraces("([](){([])})") == 'Success');
// assert(validateBraces("()[]}") == 5);
// assert(validateBraces("{{[()]]") == 7);
// assert(validateBraces("{{{[][][]") == 3);
// assert(validateBraces("{*{{}") == 3);
// assert(validateBraces("[[*") == 2);
// assert(validateBraces("{*}") == 0);
// assert(validateBraces("{{") == 2);
// assert(validateBraces("{}") == 0);
// assert(validateBraces("") == 0);
// assert(validateBraces("}") == 1);
// assert(validateBraces("*{}") == 0);
// assert(validateBraces("{{{**[][][]") == 3);