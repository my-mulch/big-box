const { matrix, arithmetic, tensor } = require('../algebra/operations')
const utils = require('../utils/array')
const Header = require('./header')

class MultiDimArray {

    constructor(A, headerOpts) {
        if (A) this.header = new Header(A)

        if (headerOpts)
            this.header = new Header(headerOpts)

    
        this.header.exposeProperties(this)

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
        return this.header.array.reduce(arithmetic.add)
    }

    matMult(B) {
        const newShape = [this.shape[0], B.shape[1]]

        return new MultiDimArray(null, {
            array: [...matrix.matMult(this, B)],
            shape: newShape,
            stride: utils.getStride(newShape),
            offset: 0,
            size: newShape[0] * newShape[1]
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

module.exports = MultiDimArray
