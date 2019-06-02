const readline = require('readline');
//const OtherSplayTree = require('splaytree');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
let n = null;
rl.on('line', (line) => {
    if (n === null) {
        n = +line;
    }
    lines.push(line);
    if (lines.length === n + 1){
        module.exports(lines.slice(1));

    }
});

class Node {
    constructor(key){
        this.key = BigInt(key);
        this.sum = BigInt(key);
    }
    addChild(node, direction){
        if (!node){
            return;
        }
        node.parent = this;
        if (direction === 'right'){
            this.right = node;
        } else {
            this.left = node;
        }
        this.sum += node.sum;
    }
    detachChild(child){
        if (!child){
            return;
        }
        child.parent = null;
        this.sum -= child.sum;
        if (this.left === child){
            this.left = null;
        } else {
            this.right = null;
        }
    }
    recalcSum(){
        this.sum = this.key + (this.left ? this.left.sum : 0n) + (this.right ? this.right.sum : 0n);
    }
}

class SplayTree {

    constructor(){
        this.root = null;
        this.previousSum = 0n;
        this.p = 1000000001n;
    }

    keyModulo(x){
        return (BigInt(+x) % this.p + this.previousSum % this.p) % this.p;
    }
    findNodeOrParent(node, key){
        if (!node){
            return;
        }
        if (node.key === key){
            return node;
        }
        if (node.key > key){
            return node.left ? this.findNodeOrParent(node.left, key) : node;
        }
        return node.right ? this.findNodeOrParent(node.right, key) : node;
    }

    rotate(parent, child){

        const grandDad = parent.parent;
        let parentDirection = 'left';
        if (grandDad){
            if (parent === grandDad.right){
                parentDirection = 'right';
            }
            grandDad.detachChild(parent);
        }

        if (child === parent.left){
            const childsChild = child.right;

            parent.detachChild(child);
            child.detachChild(childsChild);

            parent.addChild(childsChild, 'left');
            child.addChild(parent, 'right');
        } else {

            const childsChild = child.left;

            parent.detachChild(child);
            child.detachChild(childsChild);

            parent.addChild(childsChild, 'right');
            child.addChild(parent, 'left');
        }


        if (grandDad){
            grandDad.addChild(child, parentDirection);
        }

    }

    splay(node){
        if (!node.parent){
            return;
        }

        const dad = node.parent;
        const grandDad = dad.parent;

        if (!grandDad){
            this.rotate(dad, node);
        } else {
            if (node === dad.left && dad === grandDad.left){
                this.rotate(grandDad, dad);
                this.rotate(dad, node);
            } else if (node === dad.right && dad === grandDad.right){
                this.rotate(grandDad, dad);
                this.rotate(dad, node);
            } else {
                this.rotate(dad, node);
                this.rotate(grandDad, node);
            }
        }

        if (node.parent){
            this.splay(node);
        }

    }
    recalcSum(node){
        while(node.parent){
            node.parent.recalcSum();
            node = node.parent;
        }
    }
    insert(key){
        key = this.keyModulo(key);
        //console.log(`Inserting ${key}`);
        let node = this.findNodeOrParent(this.root, key);
        if (!node || node.key !== key){
            const newNode = new Node(key);
            if (node){
                const direction = newNode.key >= node.key ? 'right' : 'left';
                node.addChild(newNode, direction);
                this.recalcSum(node);
            }
            node = newNode;
        }
        this.splay(node);
        this.root = node;
    }

    maxElement(node){
        if (!node){
            return null;
        }
        if (!node.right){
            return node;
        }
        return this.maxElement(node.right);
    }

    mergeTrees(left, right){
        if (!left || !right){
            return left ? left : right;
        }

        const maxInLeft = this.maxElement(left);
        this.splay(maxInLeft);

        maxInLeft.addChild(right, 'right');
        return maxInLeft;

    }

    remove(key){
        key = this.keyModulo(key);
        //console.log(`Removing ${key}`);
        if (!this.root){
            return;
        }
        const node = this.findNodeOrParent(this.root, key);
        this.splay(node);
        this.root = node;

        if (node.key !== key){
            return;
        }

        const leftTree = node.left;
        const rightTree = node.right;

        node.detachChild(leftTree);
        node.detachChild(rightTree);

        this.root = this.mergeTrees(leftTree, rightTree);
    }
    find(key){
        key = this.keyModulo(key);
        //console.log(`Finding ${key}`);
        if (!this.root){
            return null;
        }
        const node = this.findNodeOrParent(this.root, key);
        this.splay(node);
        this.root = node;
        return node.key === key ? node : null;
    }
    sum(key, otherKey){
        key = this.keyModulo(key);
        otherKey = this.keyModulo(otherKey);

        //console.log(`Sum from ${key} to ${otherKey}`);
        if (!this.root){
            this.previousSum = 0n;
            return 0n;
        }

        const leftBorder = this.findNodeOrParent(this.root, key);
        this.splay(leftBorder);

        this.root = leftBorder;

        let greaterOrEqualThanLeft = leftBorder.right ? leftBorder.right.sum : 0n;
        if (leftBorder.key >= key){
            greaterOrEqualThanLeft += leftBorder.key;
        }

        const rightBorder = this.findNodeOrParent(leftBorder, otherKey);
        this.splay(rightBorder);
        this.root = rightBorder;

        let greaterThanRight = (rightBorder.right ? rightBorder.right.sum : 0n);
        if (rightBorder.key > otherKey){
            greaterThanRight += rightBorder.key;
        }

        this.previousSum = greaterOrEqualThanLeft - greaterThanRight;

        return this.previousSum;

    }
    // sumSimple(key, otherKey){
    //     key = this.keyModulo(key);
    //     otherKey = this.keyModulo(otherKey);
    //
    //     //console.log(`Sum from ${key} to ${otherKey}`);
    //     if (!this.root){
    //         this.previousSum = 0n;
    //         return this.previousSum;
    //     }
    //
    //     this.previousSum = this.findKeys(this.root, key, otherKey);
    //     return this.previousSum;
    //
    // }

    // findKeys(node, key, otherKey){
    //     let sum = 0n;
    //     if (node.left){
    //         sum += this.findKeys(node.left, key, otherKey);
    //     }
    //     if (node.key >= key && node.key <= otherKey){
    //         sum += node.key;
    //     }
    //     if (node.right){
    //         sum += this.findKeys(node.right, key, otherKey);
    //     }
    //     return sum;
    // }

    // inOrder(node, result){
    //     if (!node){
    //         return;
    //     }
    //     if (node.left){
    //         this.inOrder(node.left, result);
    //     }
    //     result.push(node.key);
    //     if (node.right){
    //         this.inOrder(node.right, result);
    //     }
    // }
}

const isSorted = (array) => {
    if (array.length < 2){
        return true;
    }
    for (let i = 1; i < array.length; i++){
        if (array[i] < array[i-1]){
            return false;
        }
    }
    return true;
};

const isSameArray = (arrayA, arrayB) => {
    if (!arrayA && !arrayB){
        return true;
    }
    if (!arrayA || !arrayB){
        return false;
    }
    if (arrayB.length !== arrayA.length){
        return false;
    }
    for (let i = 0; i < arrayA.length; i++){
        if (arrayA[i]!==arrayB[i]){
            return false;
        }
    }
    return true;
};

const p = 1000000001n;
const keyFunc = (sum, x) => {
    return (BigInt(+x) % p + sum % p) % p;
};

module.exports = (commands) => {

    const tree = new SplayTree();
    //const otherTree = new OtherSplayTree();
    let sum2 = 0n;

    commands.forEach((command, index) => {
        const [name, key, otherKey] = command.split(' ');

        switch (name) {
            case '+':
                tree.insert(key);
                //otherTree.add(keyFunc(sum2, key));
                break;
            case '-':
                tree.remove(key);
                //otherTree.remove(keyFunc(sum2, key));
                break;
            case '?':
                const found = tree.find(key);
                // const found2 = otherTree.find(keyFunc(sum2, key));
                // const same = !(found ^ found2);
                // if (!same){
                //     throw new Error('Found not match');
                // }
                console.log(found ? "Found" : "Not found");
                break;
            case 's':
                const sum = tree.sum(key, otherKey);

                // const k1 = keyFunc(sum2, key);
                // const k2 = keyFunc(sum2, otherKey);
                // let tmpSum = 0n;
                // otherTree.forEach((node) => {
                //     if (node.key >= k1 && node.key <= k2){
                //         tmpSum += node.key;
                //     }
                // });
                // sum2 = tmpSum;
                // if (sum !== sum2){
                //     throw new Error('Sum' +
                //         ' not match');
                // }
                console.log(sum.toString());
                break;
        }

        // const elements = [];
        // tree.inOrder(tree.root, elements);
        // if (!isSorted(elements)){
        //     throw new Error(lines.join(','));
        // }
        // const otherKeys = otherTree.keys();
        // if (!isSameArray(elements, otherKeys)){
        //     throw new Error(`Elements not match, index: ${index}`);
        // }

        //console.log('Current tree: ', elements.join(', '));
        //tree.print();

    });
};

