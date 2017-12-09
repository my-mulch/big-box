
const matmat = require('mat-mat')
const utils = require('./utils')

class MultiDimArray {

    constructor(A, header) {
        this.header = {}

        if (header) this.header = header
        else if (A) this.header = utils.createHeaderFromArray(A)
    }

    reshape(...shape) {
        return new MultiDimArray(null, {
            shape: shape,
            stride: utils.strideFor(shape)
            array: this.header.array
        })
    }

    T() {
        return new MultiDimArray(null, {
            shape: this.header.shape.reverse(),
            stride: this.header.stride.reverse(),
            array: this.header.array
        })
    }

    generalReduce(fn) {
        return this.header.array.reduce(fn)
    }

    generalMap(fn) {
        return this.header.array.map(fn)
    }

    get(...index) {
        return new MultiDimArray(null, {
            shape: utils.shapeFor(index),
            stride: this.header.stride
            array: this.header.array,
        })
    }
}

module.exports = { Array: MultiDimArray }
