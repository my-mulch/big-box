
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
            shape: this.header.shape.reverse(),
            stride: this.header.stride.reverse(),
            array: this.header.array,
        })
    }


    slice(...index) {
        const localIndex = utils.findLocalIndex(index, this.header.stride)

        if (utils.isFullySpecified(index))
            return this.header.array[localIndex]

        return new MultiDimArray(null, {
            shape: utils.getSlice(index, this.header.shape),
            offset: localIndex,
            stride: this.header.stride,
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
        return utils.helperToString(this.header)
    }
}

module.exports = { Array: MultiDimArray }
