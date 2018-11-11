import ProbabilityOperator from '../math/probability'
import TensorOperator from '../math/tensor'
import LinearAlgebraOperator from '../math/linalg'

import util from 'util' // node's
import utils from '../utils' // mine
import Header from './header'

export default class MultiDimArray {

    constructor(props) {
        this.header = props.header
        this.data = props.data

        if (this.data.constructor === Array)
            this.data = new Float64Array(utils.raw.flatten(this.data))
    }

    static convert(...arrays) {
        return arrays.map(function (array) {
            return array.constructor === Array ? MultiDimArray.array(array) : array
        })
    }

    static array(A) {
        return new MultiDimArray({
            data: A,
            header: new Header({ shape: utils.raw.getShape(A) })
        })
    }

    static zeros(...shape) {
        return new MultiDimArray({
            data: new Float64Array(TensorOperator.multiply(shape)),
            header: new Header({ shape })
        })
    }

    static ones(...shape) {
        return new MultiDimArray({
            data: new Float64Array(TensorOperator.multiply(shape)).fill(1),
            header: new Header({ shape })
        })
    }

    static eye(...shape) {

        function oneForEqualZeroForNot(index) {
            return Number(TensorOperator.equal(index))
        }

        return new MultiDimArray({
            data: [...utils.ndim.indices(shape)].map(oneForEqualZeroForNot),
            header: new Header({ shape })
        })
    }

    static arange(opts) {
        opts.start = opts.start || 0
        opts.end = opts.end || 0
        opts.step = opts.step || 1

        return new MultiDimArray({
            data: new Int32Array(TensorOperator.getIntegerRange(opts)),
            header: new Header({ shape: [Math.ceil((opts.end - opts.start) / opts.step)] })
        })
    }

    copy() {
        return new MultiDimArray({
            data: this.data.slice(),
            header: this.header.copy()
        })
    }

    *[Symbol.iterator](axis = [0]) {
        for (const index of utils.ndim.indices(this.header.sliceByAxis(axis)))
            yield this.slice(...index)
    }

    axisOperate(axis, operator) {
        if (!axis.length)
            return operator(this.data)

        return new MultiDimArray({
            data: new Float64Array(TensorOperator.elementwise(operator, ...this[Symbol.iterator](axis))),
            header: new Header({ shape: this.header.shape })
        })
    }

    dataOperate(A, operator) {
        const [A] = MultiDimArray.convert(A)

        return new MultiDimArray({
            data: new Float64Array(TensorOperator.elementwise(operator, this, A)),
            header: new Header({ shape: this.header.shape })
        })
    }

    min(...axis) { return this.axisOperate(axis, TensorOperator.min) }
    max(...axis) { return this.axisOperate(axis, TensorOperator.max) }
    mean(...axis) { return this.axisOperate(axis, TensorOperator.mean) }
    norm(...axis) { return this.axisOperate(axis, TensorOperator.norm) }

    add(A) { return this.dataOperate(A, TensorOperator.add) }
    subtract(A) { return this.dataOperate(A, TensorOperator.subtract) }
    multiply(A) { return this.dataOperate(A, TensorOperator.multiply) }
    divide(A) { return this.dataOperate(A, TensorOperator.divide) }

    static inv(A) {
        return new MultiDimArray({
            data: LinearAlgebraOperator.invert(A, MultiDimArray.eye(...A.header.shape)),
            shape: new Header({ shape: A.header.shape })
        })
    }

    static dot(A, B) {
        const [A, B] = MultiDimArray.convert(A, B)

        return new MultiDimArray({
            data: LinearAlgebraOperator.matMult(A, B),
            header: new Header({ shape: utils.linalg.matrixShape(A, B) })
        })
    }

    static cross(A, B) {
        const [A, B] = MultiDimArray.convert(A, B)

        return new MultiDimArray({
            data: LinearAlgebraOperator.cross(A, B),
            header: new Header({ shape: A.header.shape })
        })
    }

    dot(A) {
        const [A] = MultiDimArray.convert(A)

        return MultiDimArray.dot(this, A)
    }

    cross(A) {
        const [A] = MultiDimArray.convert(A)

        return MultiDimArray.cross(this, A)
    }

    inv() { return MultiDimArray.inv(this) }

    set(...indices) {
        return {
            to: (function (A) {
                const [A] = MultiDimArray.convert(A)

                const region = this.slice(...indices)

                if (region.constructor === Number)
                    return utils.ndim.write(this, indices, A)

                for (const index of utils.ndim.indices(region.header.shape))
                    utils.ndim.write(region, index, utils.ndim.broadcast(A, index))

                return this

            }).bind(this)
        }
    }

    round(precision) {
        this.data = this.data.map(function (value) { return value.toFixed(precision) })

        return this
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


    toRawFlat() { return [...this[Symbol.iterator]([...this.header.shape.keys()])] }
    toString() { return util.inspect(this.toRawArray(), { showHidden: false, depth: null }) }

    [util.inspect.custom]() { return this.toString() }
}

class Random {
    static randint(low, high, shape) {
        function randomNumbers() {
            return ProbabilityOperator.randInt(low, high)
        }

        return new Int32Array(TensorOperator.multiply(shape)).map(randomNumbers)
    }
}

MultiDimArray.random = Random
