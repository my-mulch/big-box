import ProbabilityOperator from '../math/probability'
import TensorOperator from '../math/tensor'
import MatrixOperator from '../math/matrix'

import util from 'util' // node's
import utils from '../utils' // mine
import Header from './header'

export default class MultiDimArray {

    c1(A, type = 'float64') {
        const flatA = utils.array.raw.flatten(A)
        const shapeA = utils.array.raw.getShape(A)

        this.type = utils.array.type.TYPE_MAP[type]
        this.data = new this.type(flatA)
        this.header = new Header({ shape: shapeA })

        return this
    }

    c2(data, header, type) {
        this.data = data
        this.header = header
        this.type = type

        return this.header.shape.length ? this : this.data[this.header.offset]
    }

    static array(A, type = 'float64') {
        return new MultiDimArray().c1(A, type)
    }

    static zeros(...shape) {
        return new MultiDimArray().c1(utils.array.raw.createRawArray(shape))
    }

    static arange(...args) {
        if (args.length === 1)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(0, args[0], 1)])
        if (args.length === 2)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(args[0], args[1], 1)])
        if (args.length === 3)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(args[0], args[1], args[2])])
    }

    *[Symbol.iterator](axes = [0]) {
        for (const index of utils.array.nd.indices(this.header.sliceByAxis(axes)))
            yield this.slice(...index)
    }

    axisFn(axes, operator) {
        if (!axes.length)
            return operator(this.data)

        return new MultiDimArray().c2(
            ...TensorOperator.elementwise(operator, [...this[Symbol.iterator](axes)]))
    }

    min(...axis) { return this.axisFn(axis, TensorOperator.min) }
    max(...axis) { return this.axisFn(axis, TensorOperator.max) }
    mean(...axis) { return this.axisFn(axis, TensorOperator.mean) }
    norm(...axis) { return this.axisFn(axis, TensorOperator.norm) }

    elementFn(A, operator) {
        if (A.constructor === Array)
            A = new MultiDimArray().c1(A)

        return new MultiDimArray().c2(
            ...TensorOperator.elementwise(operator, [this, A]))
    }

    add(A) { return this.elementFn(A, TensorOperator.add) }
    subtract(A) { return this.elementFn(A, TensorOperator.subtract) }
    multiply(A) { return this.elementFn(A, TensorOperator.multiply) }
    divide(A) { return this.elementFn(A, TensorOperator.divide) }

    static dot(...many) {
        return many.reduce(function (result, current) {
            return result.dot(current)
        })
    }

    dot(A) {
        if (!(A instanceof MultiDimArray))
            A = new MultiDimArray().c1(A)

        return new MultiDimArray().c2(
            ...MatrixOperator.multiply(this, A))
    }

    slice(...indices) {
        return new MultiDimArray().c2(
            this.data,
            this.header.slice(indices.map(String)),
            this.type)
    }

    T() {
        return new MultiDimArray().c2(
            this.data,
            this.header.transpose(),
            this.type)
    }

    reshape(...shape) {
        // if the array is not contigous, a reshape means data copy
        if (!this.header.contig)
            return new MultiDimArray().c2(
                new this.type(this.toRawFlat()),
                new Header({ shape }),
                this.type)

        return new MultiDimArray().c2(
            this.data,
            this.header.reshape(shape),
            this.type)
    }

    toRawArray() {
        return [...this].map(function (slice) {
            if (slice instanceof MultiDimArray) return slice.toRawArray()

            return slice
        })
    }


    toRawFlat() { return [...this[Symbol.iterator](...this.header.shape.keys())] }
    toString() { return utils.array.format.likeNumpy(this.toRawArray()) }

    [util.inspect.custom]() { return this.toString() }
}

class Random {
    static randint(low, high, shape) {
        return utils.array.raw.createRawArray(shape, function () {
            return ProbabilityOperator.randInt(low, high)
        })
    }
}

MultiDimArray.random = Random
