import { matMult, matInv, matEye } from '../math/linalg'
import { sum, min, range, max, mean, norm, noop, elementwise } from '../math/elementwise'
import { randInt } from '../math/probability'

import { flatten, sizeup } from '../array/utils'
import { matSize, matShape } from '../math/linear-algebra/utils'

import util from 'util' // node's
import Header from '../header'

export default class MultiDimArray {

    constructor(props) {
        this.header = props.header
        this.data = props.data
    }

    static convert(...arrays) {
        const cArrays = new Array(arrays.length)

        for (let i = 0; i < arrays.length; i++)
            cArrays[i] = arrays[i] instanceof MultiDimArray ? array : MultiDimArray.array(array)

        return cArrays
    }

    static array(A) {
        const header = new Header({ shape: sizeup(A) })
        const data = flatten(A, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    static zeros(...shape) {
        const header = new Header({ shape })
        const data = new Float64Array(header.size)

        return new MultiDimArray({ data, header })
    }

    static ones(...shape) {
        const header = new Header({ shape })
        const data = new Float64Array(header.size).fill(1)

        return new MultiDimArray({ data, header })
    }

    static eye(...shape) {
        const header = new Header({ shape })
        const data = identity(shape, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    static arange(...args) {
        const start = args.length === 1 ? 0 : args[0]
        const step = args.length === 3 ? args[2] : 1
        const stop = args.length === 1 ? args[0] : args[1]

        const header = new Header({ shape: [Math.ceil((stop - start) / step)] })
        const data = range(start, step, stop, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    static dot(A, B) {
        [A, B] = MultiDimArray.convert(A, B)

        if (!A.header.shape.length && !B.header.shape.length)
            return A.data[0] * B.data[0]

        if (!A.header.shape.length)
            return B.multiply(A)

        if (!B.header.shape.length)
            return A.multiply(B)

        if (matSize(A, B) === 1)
            return matMult(A, B, new Float64Array(1))[0]

        const header = new Header({ shape: matShape(A, B) })
        const data = matMult(A, B, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    static cross(A, B) {
        [A, B] = MultiDimArray.convert(A, B)

        const header = new Header({ shape: A.header.shape })
        const data = cross(A, B, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    static inv(A) {
        [A] = MultiDimArray.convert(A)

        const header = new Header({ shape: A.header.shape })
        const data = matInv(A, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    axisOperate(axes, mapper, reducer) {
        const header = this.header.axis(axes)
        const data = elementwise(A, null, mapper, reducer, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    dataOperate(A, reducer) {
        [A] = MultiDimArray.convert(A)

        const header = A.header.copy()
        const data = elementwise(this, A, noop, reducer, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    min(...axes) { return this.axisOperate(axes, noop, min) }
    max(...axis) { return this.axisOperate(axis, noop, max) }
    mean(...axis) { return this.axisOperate(axis, noop, mean) }
    norm(...axis) { return Math.sqrt(this.axisOperate(axis, square, sum)) }

    add(A) { return this.dataOperate(A, add) }
    subtract(A) { return this.dataOperate(A, subtract) }
    multiply(A) { return this.dataOperate(A, multiply) }
    divide(A) { return this.dataOperate(A, divide) }

    dot(A) { return MultiDimArray.dot(this, ...MultiDimArray.convert(A)) }
    cross(A) { return MultiDimArray.cross(this, ...MultiDimArray.convert(A)) }
    inv() { return MultiDimArray.inv(this) }


    set(...indices) {
        return {
            to: (function (A) {
                [A] = MultiDimArray.convert(A)
                const region = this.slice(...indices)

                if (region.constructor === Number)
                    return utils.array.write(this, indices, A)

                for (const index of utils.array.indices(region.header.shape))
                    utils.array.write(region, index, utils.array.broadcast(A, index))

                return this

            }).bind(this)
        }
    }

    round(precision) {
        return new MultiDimArray({
            data: this.data.map(function (value) { return value.toFixed(precision) }),
            header: this.header
        })
    }

    slice(...indices) {
        if (this.header.fullySpecified(indices))
            return this.data[this.header.flatten(indices)]

        return new MultiDimArray({
            data: this.data,
            header: this.header.slice(indices.map(String)),
        })
    }

    T() {
        return new MultiDimArray({
            data: this.data,
            header: this.header.transpose(),
        })
    }

    reshape(...shape) {
        // if the array is not contigous, a reshape means data copy
        if (!this.header.contig)
            return new MultiDimArray({
                data: new Float64Array(this.toRawFlat()),
                header: new Header({ shape })
            })

        return new MultiDimArray({
            data: this.data,
            header: this.header.reshape(shape)
        })
    }

    toRawArray() {
        return [...this].map(function (slice) {
            if (slice instanceof MultiDimArray)
                return slice.toRawArray()

            return slice
        })
    }

    toRawFlat() { return [...this.axis(...this.header.shape.keys())] }
    toString() { return util.inspect(this.toRawArray(), { showHidden: false, depth: null }) }

    *[Symbol.iterator]() { yield* this.axis(0) }
    [util.inspect.custom]() { return this.toString() }
}

class Random {
    static randint(low, high, shape) {
        function randomNumbers() {
            return ProbabilityOperator.randInt(low, high)
        }

        return new MultiDimArray({
            data: new Float64Array(multiply(shape)).map(randomNumbers),
            header: new Header({ shape })
        })
    }
}

MultiDimArray.random = Random
