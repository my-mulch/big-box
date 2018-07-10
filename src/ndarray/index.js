const utils = require('../utils/array')
const Header = require('./header')

const { probability, operations } = require('../math')
const { matrix, scalar, tensor } = operations
const { randomArray } = probability


class MultiDimArray {

    constructor(A, type = Float64Array) {
        this.data = type(utils.flatten(A))
        this.shape = utils.getShape(A)
        this.stride = utils.getStride(this.shape)
        this.offset = 0
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

    vstack(B) {
        if (!(B instanceof MultiDimArray))
            B = new MultiDimArray(B)

        const oldShape = this.shape
        const A = this.ravel().reshape(...oldShape)

        return new MultiDimArray(null, {
            array: utils.concat(A.array, B.array, Float64Array),
            shape: [A.shape[0] + 1, A.shape[1]]
        })
    }

    hstack(B) {
        if (!(B instanceof MultiDimArray))
            B = new MultiDimArray(B)

        const oldShape = this.shape
        const A = this.T().ravel().reshape(...oldShape.reverse())

        return A.vstack(B).T()
    }

    ravel() {
        return new MultiDimArray(tensor.flatten(this))
    }

    copy() {
        return new MultiDimArray(null, {
            array: new Float64Array(this.array),
            ...this.header
        })
    }

    reshape(...shape) {
        return new MultiDimArray(null, {
            shape: shape,
            array: this.array,
            offset: this.offset,
        })
    }

    T() {
        return new MultiDimArray(null, {
            array: this.array,
            shape: this.shape.slice().reverse(),
            stride: this.stride.slice().reverse(),
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
            array: this.array,
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
    static randint(start, end, shape) {
        return new MultiDimArray(null, {
            shape: shape,
            array: new Float64Array(
                randomArray(start, end, scalar.product(shape))
            )
        })
    }
}

MultiDimArray.random = Random

module.exports = MultiDimArray
