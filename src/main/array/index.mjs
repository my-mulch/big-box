import { DIVIDE, MULTIPLY, SUBTRACT, ADD, ROUND, MIN, MAX, DEFAULT, ASSIGN, NORM, MEAN, SUM } from '../../resources'

import axisSuite from '../ops/element/axis'
import pairSuite from '../ops/element/pair'

import invSuite from '../ops/linalg/inverse'
import matMultSuite from '../ops/linalg/matmult'
import crossProdSuite from '../ops/linalg/cross'

import { randint } from '../ops/probability'

import { sizeup, __Math__ } from '../array/utils'
import util from 'util' // node's
import Header from './header'

import Complex from 'complex.js'
import Formatter from 'columnify'

export default class BigBox {

    constructor({ header, type, init = function () {
        return new this.type(this.size)
    } }) {

        for (const field in header)
            this[field] = header[field]

        this.header = header
        this.type = type || Float32Array
        this.data = init.call(this)
    }

    static sanitize(args) {
        if (args.of !== undefined && args.of.constructor !== BigBox)
            args.of = BigBox.array({ with: args.of })

        if (args.with !== undefined && args.with.constructor !== BigBox)
            args.with = BigBox.array({ with: args.with })

        if (args.result !== undefined && args.result.constructor !== BigBox)
            args.result = BigBox.array({ with: args.result })
    }

    static array(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: sizeup(args.with) }),
            init: function () {

                if (args.with.constructor === Array) {
                    const flatRaw = args.with.flat(Number.POSITIVE_INFINITY)
                    const typeRes = new this.type(this.size)

                    for (let i = 0, j = 0; j < typeRes.length; i += 1, j += 2) {
                        const cn = Complex(flatRaw[i])

                        typeRes[j] = cn.re
                        typeRes[j + 1] = cn.im
                    }

                    return typeRes
                }

                else if (args.with.constructor === String || args.with.constructor === Number) {
                    const typeRes = new this.type(this.size)

                    for (let j = 0; j < typeRes.length; j += 2) {
                        const cn = Complex(args.with)

                        typeRes[j] = cn.re
                        typeRes[j + 1] = cn.im
                    }

                    return typeRes
                }

                else if (args.with.constructor === Int8Array ||
                    args.with.constructor === Uint8Array ||
                    args.with.constructor === Uint8ClampedArray ||
                    args.with.constructor === Int16Array ||
                    args.with.constructor === Uint16Array ||
                    args.with.constructor === Int32Array ||
                    args.with.constructor === Uint32Array ||
                    args.with.constructor === Float32Array
                ) {
                    this.type = args.with.constructor
                    return args.with
                }

                else throw 'Usage: bb.array({ with: rawArray | typedArray, type: typedArrayConstructor })'
            }
        })
    }

    static zeros(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: args.shape })
        })
    }

    static ones(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: args.shape }),
            init: function () {
                const typeRes = new this.type(this.size)

                for (let i = 0; i < typeRes.length; i += 2)
                    typeRes[i] = 1

                return typeRes
            }
        })
    }

    static arange(args) {
        return new BigBox({
            type: args.type,
            header: new Header({
                shape: [
                    __Math__.round((args.stop - (args.start || 0)) / (args.step || 1))
                ]
            }),
            init: function () {
                const data = new this.type(this.size)

                for (let i = args.start || 0, j = 0; i < args.stop; i += args.step || 1, j += 2)
                    data[j] = i

                return data
            }
        })
    }


    static rand(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = new this.type(this.size)

                for (let i = 0; i < data.length; i++)
                    data[i] = __Math__.random()

                return data
            }
        })
    }

    static randint(args) {
        return new BigBox({
            type: args.type || Int32Array,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = new this.type(this.size)

                for (let i = 0; i < data.length; i++)
                    data[i] = randint(args.low, args.high)

                return data
            }
        })
    }

    static dot(args) {
        BigBox.sanitize(args)

        return matMultSuite.call({
            of: args.of,
            with: args.with,
            method: DEFAULT,
            result: args.result || new BigBox({
                type: args.type,
                header: new Header({
                    shape: [
                        args.of.shape[0],
                        args.with.shape[1]
                    ]
                })
            })
        })
    }

    static cross(args) {
        BigBox.sanitize(args)

        return crossProdSuite.call({
            of: args.of,
            with: args.with,
            method: DEFAULT,
            result: args.result || new BigBox({
                type: args.type,
                header: new Header({ shape: [3, 1] })
            })
        })
    }

    static inv(args) {
        BigBox.sanitize(args)

        return invSuite.call({
            of: args.of,
            method: DEFAULT,
            result: args.result || this.eye({ shape: args.of.shape })
        })
    }

    static eye(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = new this.type(this.size)
                const diagonal = this.strides.reduce(__Math__.add)
                const numDiags = __Math__.min(...this.shape)

                for (let i = 0; i < numDiags * diagonal; i += diagonal)
                    data[i] = 1

                return data
            }
        })
    }

    astype(args) {
        this.type = args.type
        this.data = new this.type(this.data)

        return this
    }

    copy(old = this) {
        return new BigBox({
            type: this.type,
            header: this.header,
            init: function () { return old.data.slice() }
        })
    }

    ravel() {
        return BigBox
            .array({ with: this.toRaw() })
            .reshape({ shape: [-1] })
    }

    gpair(args, method) {
        BigBox.sanitize(args)

        return pairSuite.call({
            of: this,
            with: args.with,
            method: method,
            result: args.result || new BigBox({
                type: this.type,
                header: new Header({ shape: this.shape })
            })
        })
    }

    gaxis(args, method) {
        return axisSuite.call({
            of: this,
            method: method,
            axes: args.axes || this.axes.NONE,
            result: args.result || new BigBox({
                type: this.type,
                header: this.header.axisSlice(args.axes || this.axes.NONE)
            })
        })
    }

    norm(args = {}) { return this.gaxis(args, NORM) }
    mean(args = {}) { return this.gaxis(args, MEAN) }
    sum(args = {}) { return this.gaxis(args, SUM) }
    max(args = {}) { return this.gaxis(args, MAX) }
    min(args = {}) { return this.gaxis(args, MIN) }

    add(args) { return this.gpair(args, ADD) }
    divide(args) { return this.gpair(args, DIVIDE) }
    subtract(args) { return this.gpair(args, SUBTRACT) }
    multiply(args) { return this.gpair(args, MULTIPLY) }

    inv(args = {}) { return BigBox.inv({ of: this, result: args.result }) }
    dot(args) { return BigBox.dot({ of: this, with: args.with, result: args.result }) }
    cross(args) { return BigBox.cross({ of: this, with: args.with, result: args.result }) }

    round(args) {
        return axisSuite.call({
            of: this,
            method: ROUND,
            axes: this.axes.ALL,
            precision: args.precision,
            result: args.result || new BigBox({
                type: this.type,
                header: new Header({ shape: this.shape })
            })
        })
    }

    slice(args, old = this) {
        return new BigBox({
            type: this.type,
            header: this.header.slice(args.with),
            init: function () { return old.data }
        })
    }

    T(old = this) {
        return new BigBox({
            type: this.type,
            header: this.header.transpose(),
            init: function () { return old.data }
        })
    }

    reshape(args, old = this) {
        if (!this.contig)
            return BigBox
                .array({ with: this.toRaw() })
                .reshape({ shape: args.shape })

        return new BigBox({
            type: this.type,
            header: this.header.reshape(args.shape),
            init: function () { return old.data }
        })
    }

    set(args) {
        BigBox.sanitize(args)

        return pairSuite.call({
            of: this,
            with: args.with,
            method: ASSIGN,
            result: this
        })
    }

    toRaw(index = this.offset, depth = 0) {
        if (depth === this.shape.length)
            return Complex(
                this.data[index],
                this.data[index + 1]).toString()

        return new Array(this.shape[depth])
            .fill(null)
            .map(function (_, i) {
                return this.toRaw(
                    i * this.strides[depth] + index, // computed index
                    depth + 1)
            }, this)
    }

    valueOf() { return this.data[this.offset] }
    toString() { return Formatter(this.toRaw()).split('\n').slice(1).join('\n') }
    [util.inspect.custom]() { return this.toString() }
}
