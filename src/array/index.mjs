import { sum, min, range, max, noop, axisSuite, pairSuite, round } from '../ops/element'
import { matMultSuite, invSuite, crossProduct } from '../ops/linalg'
import { randInt } from '../ops/probability'

import { shape, fill } from '../array/utils'
import util from 'util' // node's
import Header from './header'


export default class MultiDimArray {

    constructor({ header, type, data }) {
        this.header = header
        this.type = type
        this.data = data || new this.type(this.header.size)
    }

    static array({ A, type = Float64Array }) {
        return fill({
            values: A,
            result: new MultiDimArray({
                type,
                header: new Header({ shape: shape(A) }),
            })
        })
    }

    static zeros({ shape, result, type = Float64Array }) {
        return fill({
            values: 0,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape }),
            })
        })
    }

    static ones({ shape, result, type = Float64Array }) {
        return fill({
            values: 1,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape }),
            })
        })
    }

    static arange({ start = 0, step = 1, stop, result, type = Float64Array }) {
        return range({
            start, step, stop,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: [Math.ceil((stop - start) / step)] })
            })
        })
    }

    static randint({ low, high, shape, result, type = Int32Array }) {
        return fill({
            values: function () { return randInt(low, high) },
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape })
            })
        })
    }

    static axixOperate({ A, axes, mapper = noop, reducer = noop, result, type = Float64Array }) {
        return axisSuite.call({
            A, axes, mapper, reducer,
            result: result || new MultiDimArray({
                type,
                header: this.header.axis(axes)
            })
        })
    }

    static pairOperate({ A, B, reducer = noop, result, type = Float64Array }) {
        return pairSuite.call({
            A, B, reducer,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    round({ precision, result, type }) {
        return MultiDimArray.axixOperate({
            A: this,
            type,
            result,
            axes: keys(this.header.shape),
            mapper: round.bind(precision)
        })
    }

    max({ axes, result, type }) {
        return MultiDimArray.axisOperate({
            A: this,
            type,
            result,
            axes,
            reducer: max,
        })
    }

    min({ axes, result, type }) {
        return MultiDimArray.axisOperate({
            A: this,
            type,
            result,
            axes,
            reducer: min,
        })
    }

    plus(B) { return this.pairOperate({ B, reducer: sum }) }
    minus(B) { return this.pairOperate({ B, reducer: diff }) }
    times(B) { return this.pairOperate({ B, reducer: prod }) }
    divide(B) { return this.pairOperate({ B, reducer: quot }) }

    dot(B, R) {
        // const header = R || new Header({ shape: [this.header.shape[0], B.header.shape[1]] })
        // const data = R || new Float64Array(header.size)

        return matMultSuite.call({ A: this, B: B, R: R })
    }

    cross(B, R) {
        const header = R || new Header({ shape: this.header.shape })
        const data = R || new Float64Array(header.size)

        return crossProduct({ A: this, B: B, R: R || new MultiDimArray({ header, data }) })
    }

    inv(R) {
        const header = R || new Header({ shape: this.header.shape })
        const data = R || new Float64Array(header.size)

        return invSuite.call({ A: this, R: R || new MultiDimArray({ header, data }) })
    }

    slice(...indices) {
        if (this.header.fullySpecified(indices))
            return this.get(indices)

        return new MultiDimArray({
            data: this.data,
            header: this.header.slice(indices.map(String)),
        })
    }

    T() {
        const data = this.data
        const header = this.header.transpose()

        return new MultiDimArray({ data, header })
    }

    reshape(...shape) {
        /**  if the array is not contigous, a reshape means data copy */
        if (!this.header.contig)
            return this.axixOperate(getIndices(this.header.shape))

        const data = this.data
        const header = this.header.reshape(shape)

        return new MultiDimArray({ data, header })
    }

    toString() { return this }
    [util.inspect.custom]() { return this.toString() }
}
