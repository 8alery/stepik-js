function binarySearch (list, value, start = 0) {
    let stop = list.length - 1;
    let middle = Math.ceil((start + stop) / 2);

    while (list[middle] !== value && start < stop) {
        if (value < list[middle]) {
            stop = middle - 1
        } else {
            start = middle + 1
        }
        middle = Math.ceil((start + stop) / 2)
    }
    return (list[middle] !== value) ? -1 : middle
}

function numbersUpTo(nums, k) {
    const sorted = nums.sort((a, b) => a - b);
    const result = [];
    const middle = Math.floor(k / 2);
    for (let i = 0; i < sorted.length; i++){
        if (sorted[i] > middle){
            break;
        }
        if (!i || sorted[i] !== sorted[i-1]){
            const index = binarySearch(sorted, k - sorted[i], i + 1);
            if (index !== -1){
                result.push([sorted[i], sorted[index]])
            }
        }
    }
    return result;
}

//console.log(numbersUpTo([1, 3, 2, 4, 20, 11, 2, 1, 3], 5));

console.log(numbersUpTo([5, 6, 4, 3, 1, 2], 7));

// function fn(n) {
//     const res = [];
//
//     for (let i = 1; i <= n; i++){
//
//         let current = (i % 2 === 0) ? i : 1;
//         let modifier = (i % 2 === 0) ? -1 : 1;
//
//         let string = [];
//
//         for (let j = 0; j < i; j++){
//             string.push(current);
//             current += modifier;
//         }
//
//         res.push(string.join('-'))
//
//     }
//
//     return res;
//
// }

// function almostPalindromes(str) {
//     const reversedStr = [...str].reverse().join('');
//     let counter = 0;
//     for (let i = 0; i < Math.floor(str.length / 2); i++){
//         if (str[i] !== reversedStr[i]){
//             counter++;
//         }
//     }
//     return counter * 2;
// }
//
// function almostPalindromes(str) {
//     let counter = 0;
//     for (let i = 0; i < Math.floor(str.length / 2); i++){
//         if (str[i] !== str[str.length - i - 1]){
//             counter++;
//         }
//     }
//     return counter * 2;
// }

// console.log(almostPalindromes('baba'));


