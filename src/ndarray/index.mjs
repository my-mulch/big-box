import ProbabilityOperator from '../math/probability'
import TensorOperator from '../math/tensor'
import MatrixOperator from '../math/matrix'

import util from 'util' // node's
import utils from '../utils' // mine
import Header from './header'

export default class MultiDimArray {

    c1(A, type = 'float64') {
        this.type = utils.array.type.TYPE_MAP[type]
        this.data = new this.type(utils.array.raw.flatten(A))
        this.header = new Header({ shape: utils.array.raw.getShape(A) })

        return this
    }

    c2(data, header, type) {
        this.type = type
        this.header = header
        this.data = data.constructor === Array ? new this.type(data) : data

        return this.header.shape.length ? this : this.data[this.header.offset]
    }

    copy() {
        return new MultiDimArray().c2(this.data.slice(), this.header.copy(), this.type)
    }

    static array(A, type = 'float64') {
        return new MultiDimArray().c1(A, type)
    }

    static zeros(...shape) {
        return new MultiDimArray().c1(utils.array.raw.createRawArray(shape))
    }

    static ones(...shape) {
        return new MultiDimArray().c1(utils.array.raw.createRawArray(shape, function () { return 1 }))
    }

    static createIdentity(indices) {
        return [...indices].map(function (index) {
            return index.reduce(function (last, i) { return last === i ? i : false })
        })
    }

    static eye(...shape) {
        return new MultiDimArray().c2(
            [...utils.array.nd.indices(shape)].map(function (index) { return Number(TensorOperator.equal(index)) }),
            new Header({ shape }),
            Uint8Array)
    }

    static arange(...args) {
        if (args.length === 1)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(0, args[0], 1)])
        if (args.length === 2)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(args[0], args[1], 1)])
        if (args.length === 3)
            return new MultiDimArray().c1([...utils.math.getIntegerRange(args[0], args[1], args[2])])
    }

    *[Symbol.iterator](opts = { axis: [0] }) {
        for (const index of utils.array.nd.indices(this.header.sliceByAxis(opts.axis)))
            yield this.slice(...index)
    }

    axisFn(axis, operator) {
        if (!axis.length)
            return operator(this.data)

        return new MultiDimArray().c2(
            ...TensorOperator.elementwise(operator, [...this[Symbol.iterator]({ axis })]))
    }

    min(opts = { axis: [] }) { return this.axisFn(opts.axis, TensorOperator.min) }
    max(opts = { axis: [] }) { return this.axisFn(opts.axis, TensorOperator.max) }
    mean(opts = { axis: [] }) { return this.axisFn(opts.axis, TensorOperator.mean) }
    norm(opts = { axis: [] }) { return this.axisFn(opts.axis, TensorOperator.norm) }

    elementFn(A, operator) {
        if (A.constructor === Array)
            A = MultiDimArray.array(A)

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
        if (A.constructor === Array)
            A = MultiDimArray.array(A)

        return new MultiDimArray().c2(
            ...MatrixOperator.multiply(this, A))
    }

    inv() {
        return new MultiDimArray().c2(
            ...MatrixOperator.invert(this))
    }

    set(...indices) {
        return {
            to: (function (data) {
                if (data.constructor === Array)
                    data = MultiDimArray.array(data)

                const region = this.slice(...indices)

                if (region.constructor === Number)
                    return utils.array.nd.write(this, indices, data)

                for (const index of utils.array.nd.indices(region.header.shape))
                    utils.array.nd.write(region, index, utils.array.nd.broadcast(data, index))

                return this

            }).bind(this)
        }
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
            if (slice instanceof MultiDimArray)
                return slice.toRawArray()

            return slice
        })
    }


    toRawFlat() { return [...this[Symbol.iterator]({ axis: this.header.shape.keys() })] }
    toString() { return util.inspect(this.toRawArray(), { showHidden: false, depth: null }) }

    [util.inspect.custom]() { return this.toString() }
}

class Random {
    static randint(low, high, shape) {
        return MultiDimArray.array(utils.array.raw.createRawArray(shape, function () {
            return ProbabilityOperator.randInt(low, high)
        }))
    }
}

MultiDimArray.random = Random
