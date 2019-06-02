

const buildTreeBU = (nodes) => {
    const nodesHash = {};
    for (let i = 0; i < nodes.length; i += 1){
        let node = nodesHash[i];
        if (!node){
            node = nodesHash[i] = { value: i, parent: null, leaf: true };
        }
        if (nodes[i] !== -1){
            const parentIndex = nodes[i];
            let parent = nodesHash[parentIndex];
            if (!parent){
                parent = nodesHash[parentIndex] = { value: parentIndex, parent: null, leaf: false };
            }
            node.parent = parent;
            parent.leaf = false;
        }
    }
    return Object.getOwnPropertyNames(nodesHash).map(i => nodesHash[i]).filter(el => el.leaf);
}

const buildTreeTD = (nodes) => {
    const nodesHash = {};
    let root = null;
    for (let i = 0; i < nodes.length; i += 1){
        let node = nodesHash[i];
        if (!node){
            node = nodesHash[i] = { value: i, children: [] };
        }
        if (nodes[i] === -1){
            root = node;
        } else {
            const parentIndex = nodes[i];
            let parent = nodesHash[parentIndex];
            if (!parent){
                parent = nodesHash[parentIndex] = { value: parentIndex, children: [] };
            }
            parent.children.push(node);
        }
    }
    return root;
}



const heightsMap = {};
// const heightForTree = (node) => {
//     if (heightsMap[node.value]){
//         return heightsMap[node.value];
//     }
//     let height = 1;
//     for (let i = 0; i < node.children.length; i += 1){
//         if (!heightsMap[node.children[i].value]){
//             heightsMap[node.children[i].value] = heightForTree(node.children[i]);
//         }
//         height = Math.max(height, heightsMap[node.children[i].value] + 1);
//     }
//     heightsMap[node.value] = height;
//     return height;
// };
const heightForTreeBU = (leaves) => {
    let height = 0;
    for (let i = 0; i < leaves.length; i++){
        let node = leaves[i];
        let tmpHeight = 1;
        while (node.parent !== null){
            tmpHeight++;
            node = node.parent;
        }
        height = Math.max(height, tmpHeight);
    }
    return height;
}

const heightForTreeTD = (root) => {
    let stack = [];
    stack.push(root);
    let height = 0;
    root.level = 1;
    while (stack.length > 0){
        const node = stack.pop();
        //node.level = level;
        node.children.forEach(c => {
            c.level = node.level + 1;
            stack.push(c);
        });
        if (node.children.length === 0){
            height = Math.max(height, node.level);
        }
    }
    return height;
}

const findHeight = (nodes) => {
    const root = buildTreeTD(nodes);
    return heightForTreeTD(root);
};

module.exports = findHeight;
//console.log(findHeight([9, 7, 5, 5, 2, 9, 9, 9, 2, -1]));

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', (input) => {
    lines.push(input);
    if (lines.length === 2){
        const nodes = lines[1].split(' ').map(el => parseInt(el, 10));
        console.log(findHeight(nodes))
    }
}).on('close', () => {
    process.exit(0);
});