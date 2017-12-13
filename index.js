
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
            this.header.shape = utils.raw.getShape(A)
            this.header.stride = utils.ndim.getStride(this.header.shape)
            this.header.array = new Float64Array(utils.raw.flatten(A))
            this.header.offset = 0
        }
    }

    static array(A) {
        return new MultiDimArray(A)
    }

    static random(shape) {
        return new MultiDimArray(null, {
            array: new Float64Array(matmat.prod(shape)).fill(null).map(Math.random),
            shape: shape,
            offset: 0,
            stride: utils.ndim.getStride(shape)
        })
    }

    static ones(shape) {
        return new MultiDimArray(null, {
            array: new Float64Array(matmat.prod(shape)).fill(1),
            shape: shape,
            offset: 0,
            stride: utils.ndim.getStride(shape)
        })
    }

    static zeros(shape) {
        return new MultiDimArray(null, {
            array: new Float64Array(matmat.prod(shape)).fill(0),
            shape: shape,
            offset: 0,
            stride: utils.ndim.getStride(shape)
        })
    }

    static arange(n) {
        return new MultiDimArray(
            new Array(n)
                .fill(null)
                .map(function (_, i) {
                    return i
                })
        )
    }

    plus(B) {
        return new MultiDimArray(null, {
            ...this.header,
            array: new Float64Array(
                utils.ndim.elementwise(this, array, function (ti, ai) {
                    return ti + ai;
                }))
        })
    }

    times(B) {
        return new MultiDimArray(null, {
            ...this.header,
            array: new Float64Array(
                utils.ndim.elementwise(this, B, function (ti, bi) {
                    return ti * bi;
                }))
        })
    }

    copy() {
        return new MultiDimArray(null, {
            ...this.header,
            array: new Float64Array(this.header.array)
        })
    }

    minus(B) {
        return new MultiDimArray(null, {
            ...this.header,
            array: new Float64Array(
                utils.ndim.elementwise(this, B, function (ti, bi) {
                    return ti - bi;
                }))
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

    generalReduce(fn) {
        return this.header.array.reduce(fn)
    }

    generalMap(fn) {
        return this.header.array.map(fn)
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
