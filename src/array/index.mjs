import { add, multiply, subtract, divide, min, range, max, noop, axisSuite, pairSuite, round, fill } from '../ops/element'
import { matMultSuite, invSuite, crossProduct, identity } from '../ops/linalg'
import { randint } from '../ops/probability'

import { shape, stringify } from '../array/utils'
import util from 'util' // node's
import Header from './header'


export default class MultiDimArray {

    constructor(args) {
        this.header = args.header
        this.type = args.type
        this.data = args.data || new this.args.type(this.header.size)
    }

    static array(args) {
        return fill({
            values: args.from,
            result: new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: shape(args.from) }),
            })
        })
    }

    static zeros(args) {
        return fill({
            values: 0,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: args.shape }),
            })
        })
    }

    static ones(args) {
        return fill({
            values: 1,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: args.shape }),
            })
        })
    }

    static arange(args) {
        return range({
            start: args.start || 0,
            step: args.step || 1,
            stop: args.stop,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: [Math.ceil((args.stop - args.start) / args.step)] })
            })
        })
    }

    static randint(args) {
        return fill({
            values: function () { return randint(args.low, args.high) },
            result: args.result || new MultiDimArray({
                type: args.type || Int32Array,
                header: new Header({ shape })
            })
        })
    }

    static dot(args) {
        return matMultSuite.call({
            of: args.of,
            with: args.with,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({
                    shape: [args.of.header.shape[0], args.with.header.shape[1]]
                })
            })
        })
    }

    static cross(args) {
        return crossProduct({
            of: args.of,
            with: args.with,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: args.of.header.shape })
            })
        })
    }

    static inv(args) {
        return invSuite.call({
            of: args.of,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: args.of.header.shape })
            })
        })
    }

    static eye(args) {
        return identity({
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: args.shape })
            })
        })
    }

    static axisOperate(args) {
        return axisSuite.call({
            of: args.of,
            axes: args.axes,
            reducer: args.reducer || noop,
            mapper: args.mapper || noop,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({
                    shape: args.axes[1].map(function (axis) { return args.of.header.shape[axis] })
                })
            })
        })
    }

    static pairOperate(args) {
        return pairSuite.call({
            of: args.of,
            with: args.with,
            reducer: args.reducer,
            result: args.result || new MultiDimArray({
                type: args.type || Float64Array,
                header: new Header({ shape: args.of.header.shape })
            })
        })
    }

    round(args) {
        return MultiDimArray.axixOperate({
            of: this,
            type: args.type,
            result: args.result,
            axes: this.header.indices,
            mapper: round.bind(args.precision)
        })
    }

    max(args) {
        return MultiDimArray.axisOperate({
            of: this,
            reducer: max,
            axes: args.axes,
            type: args.type,
            result: args.result,
        })
    }

    min(args) {
        return MultiDimArray.axisOperate({
            of: this,
            reducer: min,
            axes: args.axes,
            type: args.type,
            result: args.result,
        })
    }

    add(args) {
        return MultiDimArray.pairOperate({
            of: this,
            with: args.with,
            reducer: add,
            type: args.type,
            result: args.result,
        })
    }

    subtract(args) {
        return MultiDimArray.pairOperate({
            of: this,
            with: args.with,
            reducer: subtract,
            type: args.type,
            result: args.result,
        })
    }

    multiply(args) {
        return MultiDimArray.pairOperate({
            of: this,
            reducer: multiply,
            with: args.with,
            type: args.type,
            result: args.result,
        })
    }

    multiply(args) {
        return MultiDimArray.pairOperate({
            of: this,
            reducer: divide,
            with: args.with,
            type: args.type,
            result: args.result,
        })
    }

    dot(args) {
        return MultiDimArray.dot({
            of: this,
            with: args.with,
            type: args.type,
            result: args.result
        })
    }

    cross(args) {
        return MultiDimArray.cross({
            of: this,
            with: args.with,
            type: args.type,
            result: args.result
        })
    }

    inv(args) {
        return MultiDimArray.inv({
            of: this,
            type: args.type,
            result: args.result
        })
    }

    slice(args) {
        if (this.header.fullySpecified(indices))
            return MultiDimArray
                .axixOperate({ of: this, axes: this.header.indices })
                .data[0]

        return new MultiDimArray({
            data: this.data,
            type: this.args.type,
            header: this.header.slice(args.indices.map(String)),
        })
    }

    T() {
        return new MultiDimArray({
            data: this.data,
            type: this.args.type,
            header: this.header.transpose()
        })
    }

    reshape(args) {
        /**  if the array is not contigous, a reshape means data copy */
        if (!this.header.contig)
            return this
                .axixOperate({ of: this, axes: [] })
                .reshape(args)

        return new MultiDimArray({
            data: this.data,
            type: this.args.type,
            header: this.header.reshape(args.shape),
        })
    }

    toString() { return stringify(this) }
    [util.inspect.custom]() { return this.toString() }
}
