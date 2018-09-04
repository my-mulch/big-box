import ProbabilityOperator from '../math/probability/index.mjs'
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

    static dot(...many) {
        return many.reduce(function (result, current) {
            return result.dot(current)
        })
    }

    dot(A) {
        return new MultiDimArray().c2(
            ...MatrixOperator.multiply(this, A)
        )
    }

    axisFn(axes, operator) {
        if (!axes.length)
            return operator(this.data)

        return new MultiDimArray().c2(
            ...TensorOperator.elementwise(operator, [...this.sliceByAxis(axes)])
        )
    }

    min(...axis) { return this.axisFn(axis, TensorOperator.min) }
    max(...axis) { return this.axisFn(axis, TensorOperator.max) }
    mean(...axis) { return this.axisFn(axis, TensorOperator.mean) }
    norm(...axis) { return this.axisFn(axis, TensorOperator.norm) }

    slice(...indices) {
        return new MultiDimArray().c2(
            this.data,
            this.header.slice(indices),
            this.type)
    }

    * sliceByAxis(axes = [0]) {
        for (const index of utils.array.nd.indices(this.header.sliceByAxis(axes)))
            yield this.slice(...index)
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
        return [...this.sliceByAxis()].map(function (slice) {
            if (slice instanceof MultiDimArray) return slice.toRawArray()

            return slice
        })
    }

    toRawFlat() {
        return [...this.sliceByAxis(...this.header.shape.keys())]
    }

    toString() { return utils.array.format.likeNumpy(this.toRawArray()) }
    [util.inspect.custom]() { return this.toString() }
}

MultiDimArray.random = class Random {
    static randint(min, max, shape) {
        return new MultiDimArray().c1(
            utils.array.raw.createRawArray(shape, function () {
                return ProbabilityOperator.randInt(min, max)
            })
        )
    }
}
