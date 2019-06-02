const readline = require('readline');
//const OtherSplayTree = require('splaytree');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
let string;
let n = null;
rl.on('line', (line) => {
    if (lines.length === 0) {
        string = line;
    } else if (lines.length === 1){
        n = +line;
    }
    lines.push(line);
    if (lines.length === n + 2){
        module.exports(string, lines.slice(2));

    }
});

class Node {
    constructor(value){
        this.value = value;
        this.count = 1;
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
        this.count += node.count;
    }
    detachChild(child){
        if (!child){
            return;
        }
        child.parent = null;
        this.count -= child.count;
        if (this.left === child){
            this.left = null;
        } else {
            this.right = null;
        }
        return child;
    }
    recalcSum(){
        this.count = 1 + (this.left ? this.left.count : 0) + (this.right ? this.right.count : 0);
    }
}

class SplayTree {

    constructor(){
        this.root = null;
        this.p = 1000000001;
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

       while (node.parent){
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

       }

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

    inOrderTraverse(node, fn){
        const stack = [node];
        const nodes = [];

        while (stack.length){
            if (node && node.left){
                node = node.left;
                stack.push(node);
            } else {
                node = stack.pop();
                nodes.push(node);
                node = node.right;
                if (node){
                    stack.push(node);
                }
            }
        }

        nodes.forEach(fn);

    }
    toString(){
        const result = [];
        this.inOrderTraverse(this.root, (node) => {
            result.push(node.value);
        });
        return result.join('');
    }
    findByIndex(node, index){

        let leftCount = (node.left ? node.left.count : 0);

        while (index !== leftCount && node){
            if (index < leftCount){
                node = node.left;
            } else {
                node = node.right;
                index = index - leftCount - 1;
            }
            leftCount = (node.left ? node.left.count : 0);
        }

        return node;
    }
    split(root, index){
        if (!root){
            return  [null, null];
        }
        if (index >= root.count){
            const lastNode = this.findByIndex(root, root.count - 1);
            this.splay(lastNode);
            return [lastNode, null];
        } else {
            const node = this.findByIndex(root, index);
            this.splay(node);
            const v1 = node.detachChild(node.left);
            return [v1, node];
        }


    }
    substring(i, j, k){
       if (!this.root){
           return;
       }

       const [before, substringAndAfter] = this.split(this.root, i);
       const [substring, after] = this.split(substringAndAfter, j - i + 1);

       const leftovers = this.mergeTrees(before, after);

       if (k > 0){
           const [beforeK, afterK] = this.split(leftovers, k);

           const tmpNode = this.mergeTrees(beforeK, substring);
           this.root = this.mergeTrees(tmpNode, afterK);

       } else {
           this.root = this.mergeTrees(substring, leftovers);
       }


    }
}





module.exports = (initialString, commands) => {

    const tree = new SplayTree();
    initialString.split('').forEach((symbol, index) => {

        const left = tree.root;
        const right = new Node(symbol);
        tree.root = tree.mergeTrees(left, right);

    });

    //console.log('Initial tree: ', tree.toString());

    commands.forEach((command, index) => {
        const [i, j, k] = command.split(' ').map(el => +el);
        tree.substring(i, j, k);
        //console.log(`After ${i} command: `, tree.toString());
    });

    console.log(tree.toString());

};

