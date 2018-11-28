import { matMult, matInv, matEye } from '../math/linalg'
import { sum, min, range, max, mean, norm, noop, axisWise, pairWise, round } from '../math/elementwise'
import { randInt } from '../math/probability'

import { stridesFor } from '../header/utils'
import { arrFlat, arrSize } from '../array/utils'
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
        const header = new Header({ shape: arrSize(A) })
        const data = arrFlat(A, new Float64Array(header.size))

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

    axisOperate(axis, mapper, reducer) {
        const strides = axisStride(this.header.shape, 1, axis)

        const header = this.header.axis(new Set(axis))
        const data = axisWise(A, strides, mapper, reducer, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    pairOperate(A, reducer) {
        [A] = MultiDimArray.convert(A)

        const header = new Header({ shape: this.header.shape })
        const data = pairWise(this, A, reducer, new Float64Array(header.size))

        return new MultiDimArray({ data, header })
    }

    min(...axis) { return this.axisOperate(axis, noop, min) }
    max(...axis) { return this.axisOperate(axis, noop, max) }
    mean(...axis) { return this.axisOperate(axis, noop, mean) }
    norm(...axis) { return Math.sqrt(this.axisOperate(axis, square, sum)) }

    add(A) { return this.pairOperate(A, sum) }
    subtract(A) { return this.pairOperate(A, diff) }
    multiply(A) { return this.pairOperate(A, prod) }
    divide(A) { return this.pairOperate(A, quot) }


    dot(A) { return MultiDimArray.dot(this, ...MultiDimArray.convert(A)) }
    cross(A) { return MultiDimArray.cross(this, ...MultiDimArray.convert(A)) }
    inv() { return MultiDimArray.inv(this) }

    /** Write & Slice are chunk read, write */

    slice(...indices) {
        if (this.header.fullySpecified(indices))
            return this.get(indices)

        return new MultiDimArray({
            data: this.data,
            header: this.header.slice(indices.map(String)),
        })
    }

    write(...indices) {
        return {
            to: (function (A) {
                [A] = MultiDimArray.convert(A)
                const region = this.slice(...indices)

                if (region.constructor === Number)
                    this.set(indices).to(region)

                for (let i = 0; i < region.size; i++)
                    region.set(i).to(A.get(i))

                return this
            }).bind(this)
        }
    }

    /** Set & Get are index read, write */

    get(index) {
        this.data[this.header.lookup(index)]
    }

    set(index) {
        return {
            to: (function (value) { this.data[this.header.lookup(index)] = value }).bind(this)
        }
    }

    round(precision) {
        const header = new Header({ shape: this.header.shape })
        const data = new Float64Array(header.size)

        axisWise({
            A: this,
            strides: this.header.strides.local,
            mapper: round.bind(null, precision),
            reducer: noop,
            result: data
        })

        return new MultiDimArray({ header, data })
    }

    T() {
        const data = this.data
        const header = this.header.transpose()

        return new MultiDimArray({ data, header })
    }

    reshape(...shape) {
        /**  if the array is not contigous, a reshape means data copy */
        if (!this.header.contig) {
            const header = new Header({ shape })
            const data = new Float64Array(header.size)

            for ()

                return new MultiDimArray({ data, header })
        }

        const data = this.data
        const header = 

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
