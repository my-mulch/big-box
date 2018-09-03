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

    static axisFn(axes, operator) {
        if (!axes.length)
            return operator(this.data)

        return new MultiDimArray().c2(
            ...TensorOperator.elementwise(operator, [...this.sliceAxis(axes)])
        )
    }

    static arange(...args) {
        if (args.length === 1)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(0, args[0], 1)])
        if (args.length === 2)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(args[0], args[1], 1)])
        if (args.length === 3)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(args[0], args[1], args[2])])
    }

    min(...axis) { return MultiDimArray.axisFn(axis, TensorOperator.min) }
    max(...axis) { return MultiDimArray.axisFn(axis, TensorOperator.max) }
    mean(...axis) { return MultiDimArray.axisFn(axis, TensorOperator.mean) }
    norm(...axis) { return MultiDimArray.axisFn(axis, TensorOperator.norm) }

    dot(many) {
        return new MultiDimArray().c2(
            ...MatrixOperator.multiply(this, A)
        )
    }

    round(precision = 0) {
        return new MultiDimArray().c2(
            utils.math.round(this.data, precision),
            this.header,
            this.type)
    }

    T() {
        return new MultiDimArray().c2(
            this.data,
            this.header.transpose(),
            this.type)
    }

    slice(...indices) {
        return new MultiDimArray().c2(
            this.data,
            this.header.slice(indices),
            this.type)
    }

    * sliceAxis(axes) {
        for (const index of utils.array.nd.indices(this.header.sliceAxis(axes)))
            yield this.slice(...index)
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

    toRawFlat() {
        return [...this.sliceAxis(...this.header.shape.keys())]
    }

    toString() {
        return [...this.sliceAxis(0)].map(function (slice) {
            return slice instanceof MultiDimArray
                ? slice.toString()
                : utils.array.format.formatNumber(slice)
        })
    }

    [util.inspect.custom]() {
        return this.toString()
    }
}