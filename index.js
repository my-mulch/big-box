
const matmat = require('mat-mat')
const utils = require('./utils')

class MultiDimArray {

    constructor(A, header) {
        this.header = {}

        if (A && header)
            throw new Error('Cannot specify both header and Array')

        if (header)
            this.header = header

        if (A) {
            this.header.shape = utils.getShape(A)
            this.header.stride = utils.getStride(this.header.shape)
            this.header.array = new Float64Array(utils.flatten(A))
            this.header.offset = 0
        }
    }

    reshape(...shape) {
        return new MultiDimArray(null, {
            shape: shape,
            stride: utils.getStride(shape),
            array: this.header.array,
        })
    }

    T() {
        return new MultiDimArray(null, {
            ...this.header,
            shape: this.header.shape.slice().reverse(),
            stride: this.header.stride.slice().reverse(),
        })
    }


    slice(...index) {
        const localIndex = utils.findLocalIndex(index, this.header)

        if (utils.isFullySpecified(index, this.header.shape))
            return this.header.array[this.header.offset + localIndex]

        const [newShape, newStride] = utils.getSlice(index, this.header)

        return new MultiDimArray(null, {
            shape: newShape,
            offset: this.header.offset + localIndex,
            stride: newStride,
            array: this.header.array,
        })
    }

    generalReduce(fn) {
        return this.header.array.reduce(fn)
    }

    generalMap(fn) {
        return this.header.array.map(fn)
    }

    toString() {
        // tribute to the greats ====>
        return utils.wrapperString('array($)', utils.helperToString(this.header))
    }

    inspect() {
        return this.toString()
    }
}

module.exports = { Array: MultiDimArray }
