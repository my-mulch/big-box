const utils = require('./utils')
const algebra = require('../algebra')

class MultiDimArray {

    constructor(A, header) {
        this.header = {}

        if (A && header)
            throw new Error('Cannot specify both header and Array')

        if (header)
            this.header = header

        if (A) {
            this.header.shape = utils.raw.getShape(A)
            this.header.stride = utils.ndim.getStride(this.header.shape)
            this.header.array = new Float64Array(utils.raw.flatten(A))
            this.header.size = algebra.ops.product(this.header.shape)
            this.header.offset = 0
        }
    }

    static array(A) {
        return new MultiDimArray(A)
    }

    static empty(shape) {
        const size = algebra.ops.product(shape)

        return new MultiDimArray(null, {
            shape: shape,
            stride: utils.ndim.getStride(shape),
            array: new Float64Array(size),
            size: size,
            offset: 0,
        })
    }

    static random(shape) {
        const size = algebra.ops.product(shape)

        return new MultiDimArray(null, {
            array: new Float64Array(size),
            shape: shape,
            size: size,
            offset: 0,
            stride: utils.ndim.getStride(shape)
        }).generalMap(Math.random)
    }

    static ones(shape) {
        const size = algebra.ops.product(shape)

        return new MultiDimArray(null, {
            array: new Float64Array(size).fill(1),
            shape: shape,
            size: size,
            offset: 0,
            stride: utils.ndim.getStride(shape)
        })
    }

    static zeros(shape) {
        const size = algebra.ops.product(shape)

        return new MultiDimArray(null, {
            array: new Float64Array(size).fill(0),
            shape: shape,
            size: size,
            offset: 0,
            stride: utils.ndim.getStride(shape)
        })
    }

    static arange(start, end, step = 1) {

        let arraySize
        switch (arguments.length) {
            case 1:
                arraySize = start
                start = 0
                break
            case 2: arraySize = end - start
                break
            case 3: arraySize = Math.ceil((end - start) / step)
                break
        }

        return new MultiDimArray(
            new Array(arraySize)
                .fill(null)
                .map(function (_, i) {
                    return start + i * step
                })
        )
    }

    dot(B) {
        return algebra.linear.matrixProduct(this, B)
    }

    plus(B) {
        return algebra.tensor.add(this, B)
    }

    times(B) {
        return algebra.tensor.multiply(this, B)
    }

    minus(B) {
        return algebra.tensor.subtract(this, B)
    }

    copy() {
        return new MultiDimArray(null, {
            ...this.header,
            array: new Float64Array(this.header.array)
        })
    }


    reshape(...shape) {
        return new MultiDimArray(null, {
            ...this.header,
            shape: shape,
            stride: utils.ndim.getStride(shape),
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
        const localIndex = utils.ndim.findLocalIndex(index, this.header)

        if (utils.ndim.isFullySpecified(index, this.header.shape))
            return this.header.array[localIndex]

        const [newShape, newStride] = utils.ndim.getSlice(index, this.header)

        return new MultiDimArray(null, {
            shape: newShape,
            offset: localIndex,
            stride: newStride,
            array: this.header.array,
        })
    }

    set(type, value, ...index) {

        const [val] = value
        const localIndex = utils.ndim.findLocalIndex(index, this.header)

        switch (type) {
            case "+=": return this.header.array[localIndex] += val
            case "-=": return this.header.array[localIndex] -= val
            case "*=": return this.header.array[localIndex] *= val
            case "/=": return this.header.array[localIndex] /= val
            default: return this.header.array[localIndex] = val
        }

    }

    generalMap(fn) {
        this.header.array.map(fn)
        return this
    }

    toString() {
        return utils.ndim.wrapperString(
            'array($)',
            utils.ndim.helperToString(this.header)
        )
    }

    inspect() {
        return this.toString()
    }
}

module.exports = { ndim: MultiDimArray }
