const utils = require('../utils/array')
const Header = require('./header')

const { probability, operations } = require('../math')
const { matrix, scalar, tensor } = operations
const { randomArray } = probability


class MultiDimArray {

    constructor(A, headerOpts) {

        if (A && headerOpts)
            throw new Error("Cannot specify both header options and array")

        if (A)
            this.header = new Header(A)

        if (headerOpts)
            this.header = new Header(headerOpts)

        this.header.exposeProperties(this)
        this.random = new Random()
    }

    static array(A) {
        return new MultiDimArray(A)
    }

    dot(B) {
        return this.times(B).sum()
    }

    plus(B) {
        return new MultiDimArray(tensor.add(this, B))
    }

    times(B) {
        return new MultiDimArray(tensor.multiply(this, B))
    }

    minus(B) {
        return new MultiDimArray(tensor.subtract(this, B))
    }

    sum() {
        return this.header.array.reduce(scalar.add)
    }

    matMult(B) {
        return new MultiDimArray(null, {
            array: [...matrix.matMult(this, B)],
            shape: [this.shape[0], B.shape[1]]
        })
    }

    copy() {
        return new MultiDimArray()
    }

    reshape(...shape) {
        return new MultiDimArray({})
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

        if (utils.indexIsFullySpecified(index, this.header))
            return this.header.array[localIndex]

        const [newShape, newStride] = utils.getSlice(index, this.header)

        return new MultiDimArray(null, {
            shape: newShape,
            offset: localIndex,
            stride: newStride,
            array: this.header.array,
        })
    }

    set(index, assigns, value) {
        const localIndex = utils.findLocalIndex(index, this.header)

        switch (assigns) {
            case "+=": return this.header.array[localIndex] += value
            case "-=": return this.header.array[localIndex] -= value
            case "*=": return this.header.array[localIndex] *= value
            case "/=": return this.header.array[localIndex] /= value
            case "=": return this.header.array[localIndex] = value
        }
    }

    toString() {
        return utils.wrapperString(
            'array($)',
            utils.helperToString(this.header)
        )
    }

    inspect() {
        return this.toString()
    }
}

class Random {

    randint(start, end, shape) {
        return new MultiDimArray(null, {
            shape: shape,
            array: randomArray(start, end, scalar.product(shape))
        })
    }
}

module.exports = MultiDimArray
