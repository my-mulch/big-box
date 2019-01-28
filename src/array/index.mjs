import { sum, min, range, max, noop, axisSuite, pairSuite, round, fill } from '../ops/element'
import { matMultSuite, invSuite, crossProduct, identity } from '../ops/linalg'
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

    static array({ of, type = Float64Array }) {
        return fill({
            values: of,
            result: new MultiDimArray({
                type,
                header: new Header({ shape: shape(of) }),
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

    static dot({ of, against, result, type = Float64Array }) {
        return matMultSuite.call({
            of, against,
            result: result || new MultiDimArray({
                type,
                header: new Header({
                    type,
                    shape: [of.header.shape[0], against.header.shape[1]]
                })
            })
        })
    }

    static cross({ of, against, result, type = Float64Array }) {
        return crossProduct({
            of, against,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: of.header.shape })
            })
        })
    }

    static inv({ of, result, type = Float64Array }) {
        return invSuite.call({
            of,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: of.header.shape })
            })
        })
    }

    static eye({ shape, result, type = Float64Array }) {
        return identity({
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape })
            })
        })
    }

    static axixOperate({ of, axes, mapper = noop, reducer = noop, result, type = Float64Array }) {
        return axisSuite.call({
            of, axes, mapper, reducer,
            result: result || new MultiDimArray({
                type,
                header: this.header.axis(axes)
            })
        })
    }

    static pairOperate({ of, against, reducer = noop, result = noop, type = Float64Array }) {
        return pairSuite.call({
            of, against, reducer,
            result: result || new MultiDimArray({
                type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    round({ precision, result, type }) {
        return MultiDimArray.axixOperate({
            of: this, type, result,
            axes: keys(this.header.shape),
            mapper: round.bind(precision)
        })
    }

    max({ axes, result, type }) {
        return MultiDimArray.axisOperate({
            of: this, type, result, axes,
            reducer: max,
        })
    }

    min({ axes, result, type }) {
        return MultiDimArray.axisOperate({
            of: this, type, result, axes,
            reducer: min,
        })
    }

    plus({ against, result, type }) {
        return MultiDimArray.pairOperate({
            of: this, against, type, result,
            reducer: sum,
        })
    }

    minus({ against, result, type }) {
        return MultiDimArray.pairOperate({
            of: this, against, type, result,
            reducer: diff,
        })
    }

    times({ against, result, type }) {
        return MultiDimArray.pairOperate({
            of: this, against, type, result,
            reducer: sum,
        })
    }

    divide({ against, result, type }) {
        return MultiDimArray.pairOperate({
            of: this, against, type, result,
            reducer: quot,
        })
    }

    dot({ against, result, type }) {
        return MultiDimArray.dot({ of: this, against, result, type })
    }

    cross({ against, result, type }) {
        return MultiDimArray.cross({ of: this, against, result, type })
    }

    inv({ result, type }) {
        return MultiDimArray.inv({ of: this, result, type })
    }

    slice({ indices }) {
        if (this.header.fullySpecified(indices))
            return MultiDimArray.axixOperate({
                of: this, axes: keys(this.header.shape)
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

    reshape({ shape }) {
        /**  if the array is not contigous, a reshape means data copy */
        if (!this.header.contig)
            return this.axixOperate({ of: this, axes: [] })

        return new MultiDimArray({
            data: this.data,
            type: this.type,
            header: this.header.reshape(shape),
        })
    }

    toString() { return stringify(this) }
    [util.inspect.custom]() { return this.toString() }
}
