import { sum, min, range, max, noop, axisSuite, pairSuite, round, fill } from '../ops/element'
import { matMultSuite, invSuite, crossProduct } from '../ops/linalg'
import { randint } from '../ops/probability'

import { shape, keys, stringify } from '../array/utils'
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
            values: function () { return randint(low, high) },
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape })
            })
        })
    }

    static dot({ A, B, result, type = Float64Array }) {
        return matMultSuite.call({
            A, B,
            result: result || new MultiDimArray({
                type,
                header: new Header({
                    type,
                    shape: [A.header.shape[0], B.header.shape[1]]
                })
            })
        })
    }

    static cross({ A, B, result, type = Float64Array }) {
        return crossProduct({
            A, B,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: A.header.shape })
            })
        })
    }

    static inv({ A, result, type = Float64Array }) {
        return invSuite.call({
            A,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: this.header.shape })
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

    static pairOperate({ A, B, reducer = noop, result = noop, type = Float64Array }) {
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
            A: this, type, result,
            axes: keys(this.header.shape),
            mapper: round.bind(precision)
        })
    }

    max({ axes, result, type }) {
        return MultiDimArray.axisOperate({
            A: this, type, result, axes,
            reducer: max,
        })
    }

    min({ axes, result, type }) {
        return MultiDimArray.axisOperate({
            A: this, type, result, axes,
            reducer: min,
        })
    }

    plus({ B, result, type }) {
        return MultiDimArray.pairOperate({
            A: this, B, type, result,
            reducer: sum,
        })
    }

    minus({ B, result, type }) {
        return MultiDimArray.pairOperate({
            A: this, B, type, result,
            reducer: diff,
        })
    }

    times({ B, result, type }) {
        return MultiDimArray.pairOperate({
            A: this, B, type, result,
            reducer: sum,
        })
    }

    divide({ B, result, type }) {
        return MultiDimArray.pairOperate({
            A: this, B, type, result,
            reducer: quot,
        })
    }

    dot({ B, result, type }) {
        return MultiDimArray.dot({ A: this, B, result, type })
    }

    cross({ B, result, type }) {
        return MultiDimArray.cross({ A: this, B, result, type })
    }

    inv({ result, type }) {
        return MultiDimArray.inv({ A: this, result, type })
    }

    slice(...indices) {
        if (this.header.fullySpecified(indices))
            return MultiDimArray.axixOperate({
                A: this, axes: keys(this.header.shape)
            }).data[0]

        return new MultiDimArray({
            data: this.data,
            type: this.type,
            header: this.header.slice(indices.map(String)),
        })
    }

    T() {
        return new MultiDimArray({
            data: this.data,
            type: this.type,
            header: this.header.transpose()
        })
    }

    reshape(...shape) {
        /**  if the array is not contigous, a reshape means data copy */
        if (!this.header.contig)
            return this.axixOperate({ A: this, axes: [] })

        return new MultiDimArray({
            data: this.data,
            type: this.type,
            header: this.header.reshape(shape),
        })
    }

    toString() { return stringify(this) }
    [util.inspect.custom]() { return this.toString() }
}
