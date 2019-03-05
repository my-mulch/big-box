import { DIVIDE, MULTIPLY, SUBTRACT, ADD, ROUND, MIN, MAX, MEAN, NORM, DEFAULT, ASSIGN } from '../../resources'

import axisSuite from '../ops/element/axis'
import pairSuite from '../ops/element/pair'

import invSuite from '../ops/linalg/inverse'
import matMultSuite from '../ops/linalg/matmult'
import crossProdSuite from '../ops/linalg/cross'

import { randint } from '../ops/probability'

import { shape, stringify, __Math__ } from '../array/utils'
import util from 'util' // node's
import Header from './header'


export default class MultiDimArray {

    constructor({ header, type, init = function () {
        return new this.type(this.header.size)
    } }) {
        this.header = header
        this.type = type || Float64Array
        this.data = init.call(this)
    }

    static array(args) {
        if (args.from.constructor === MultiDimArray)
            return args.from

        return new MultiDimArray({
            type: args.type,
            header: new Header({ shape: shape(args.from) }),
            init: function () {
                if (args.from.constructor === Array)
                    return new this.type(args.from.flat(Number.POSITIVE_INFINITY))

                if (args.from.constructor === Number)
                    return new this.type(this.header.size).fill(args.from)
            }
        })
    }

    static zeros(args) {
        return new MultiDimArray({
            type: args.type,
            header: new Header({ shape: args.shape })
        })
    }

    static ones(args) {
        return new MultiDimArray({
            type: args.type,
            header: new Header({ shape: args.shape }),
            init: function () { return new this.type(this.header.size).fill(1) }
        })
    }

    static arange(args) {
        return new MultiDimArray({
            type: args.type,
            header: new Header({
                shape: [__Math__.round((args.stop - (args.start || 0)) / (args.step || 1))]
            }),
            init: function () {
                const data = new this.type(this.header.size)

                for (let i = args.start || 0, j = 0; i < args.stop; i += args.step || 1, j++)
                    data[j] = i

                return data
            }
        })
    }

    static randint(args) {
        return new MultiDimArray({
            type: args.type || Int32Array,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = new this.type(this.header.size)

                for (let i = 0; i < data.length; i++)
                    data[i] = randint(args.low, args.high)

                return data
            }
        })
    }

    static dot(args) {
        return matMultSuite.call({
            of: MultiDimArray.array({ from: args.of }),
            with: MultiDimArray.array({ from: args.with }),
            method: DEFAULT,
            result: args.result || new MultiDimArray({
                type: args.type,
                header: new Header({ shape: [args.of.header.shape[0], args.with.header.shape[1]] })
            })
        })
    }

    static cross(args) {
        return crossProdSuite.call({
            of: MultiDimArray.array({ from: args.of }),
            with: MultiDimArray.array({ from: args.with }),
            method: DEFAULT,
            result: args.result || new MultiDimArray({
                type: args.type,
                header: new Header({ shape: [3] })
            })
        })
    }

    static inv(args) {
        return invSuite.call({
            of: MultiDimArray.array({ from: args.of }),
            method: DEFAULT,
            result: args.result || this.eye({ shape: args.of.header.shape })
        })
    }

    static eye(args) {
        return new MultiDimArray({
            type: args.type,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = new this.type(this.header.size)
                const diagonal = this.header.strides.reduce(__Math__.add)
                const numDiags = __Math__.min(...this.header.shape)

                for (let i = 0; i < numDiags * diagonal; i += diagonal)
                    data[i] = 1

                return data
            }
        })
    }

    copy(old = this) {
        return new MultiDimArray({
            type: this.type,
            header: this.header,
            init: function () { return old.data.slice() }
        })
    }

    mean(args = {}) {
        return axisSuite.call({
            of: this,
            method: MEAN,
            axes: args.axes || this.header.axes.NONE,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: this.header.axisSlice(args.axes || this.header.axes.NONE)
            })
        })
    }

    norm(args = {}) {
        return axisSuite.call({
            of: this,
            method: NORM,
            axes: args.axes || this.header.axes.NONE,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: this.header.axisSlice(args.axes || this.header.axes.NONE)
            })
        })
    }

    max(args = {}) {
        return axisSuite.call({
            of: this,
            method: MAX,
            axes: args.axes || this.header.axes.NONE,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: this.header.axisSlice(args.axes || this.header.axes.NONE)
            })
        })
    }

    min(args = {}) {
        return axisSuite.call({
            of: this,
            method: MIN,
            axes: args.axes || this.header.axes.NONE,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: this.header.axisSlice(args.axes || this.header.axes.NONE)
            })
        })
    }

    round(args) {
        return axisSuite.call({
            of: this,
            method: ROUND,
            axes: this.header.axes.ALL,
            precision: args.precision,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    add(args) {
        return pairSuite.call({
            of: this,
            with: MultiDimArray.array({ from: args.with }),
            method: ADD,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    subtract(args) {
        return pairSuite.call({
            of: this,
            with: MultiDimArray.array({ from: args.with }),
            method: SUBTRACT,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    multiply(args) {
        return pairSuite.call({
            of: this,
            with: MultiDimArray.array({ from: args.with }),
            method: MULTIPLY,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    divide(args) {
        return pairSuite.call({
            of: this,
            with: MultiDimArray.array({ from: args.with }),
            method: DIVIDE,
            result: args.result || new MultiDimArray({
                type: this.type,
                header: new Header({ shape: this.header.shape })
            })
        })
    }

    dot(args) { return MultiDimArray.dot({ of: this, with: args.with, result: args.result }) }
    cross(args) { return MultiDimArray.cross({ of: this, with: args.with, result: args.result }) }
    inv(args = {}) { return MultiDimArray.inv({ of: this, result: args.result }) }

    slice(args, old = this) {
        return new MultiDimArray({
            type: this.type,
            header: this.header.slice(args.with),
            init: function () { return old.data }
        })
    }

    T(old = this) {
        return new MultiDimArray({
            type: this.type,
            header: this.header.transpose(),
            init: function () { return old.data }
        })
    }

    reshape(args, old = this) {
        if (!this.header.contig)
            return axisSuite.call({
                of: this,
                axes: this.header.axes.ALL,
                method: ASSIGN,
                result: new MultiDimArray({
                    type: this.type,
                    header: new Header({ shape: args.shape }),
                    init: function () { return old.data }
                })
            })

        return new MultiDimArray({
            type: this.type,
            header: this.header.reshape(args.shape),
            init: function () { return old.data }
        })
    }

    set(args) {
        return pairSuite.call({
            of: this,
            with: MultiDimArray.array({ from: args.to }),
            method: ASSIGN,
            result: this
        })
    }

    valueOf() { return this.data[this.header.offset] }
    toString() { return stringify.call(this) }
    [util.inspect.custom]() { return this.toString() }
}
