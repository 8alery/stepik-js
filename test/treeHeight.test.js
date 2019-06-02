const treeHeight = require('../treeHeight');
const { expect } = require('chai');

describe('Tree Height', () => {

    it('should be 4', () => {
        const height = treeHeight([9, 7, 5, 5, 2, 9, 9, 9, 2, -1]);
        console.log(height)
        expect(height).to.equal(4);
    })

})
