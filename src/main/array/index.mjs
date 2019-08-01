import {
    shapeRaw, shapeAlign, arrayAlign,
    selfAxesAndShape, pairAxesAndShape
} from './utils'

import { __Math__ } from '../../resources'

import util from 'util' // node's
import Complex from 'complex.js'

import Header from '../header'
import opsSuite from '../ops'

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
        if (args.of && args.of.constructor !== BigBox)
            args.of = BigBox.array({ with: args.of })

        if (args.with && args.with.constructor !== BigBox)
            args.with = BigBox.array({ with: args.with })

        const shapeInfo = shapeAlign(args)

        if (shapeInfo && shapeInfo.short === args.of)
            args.of = arrayAlign(shapeInfo)

        else if (shapeInfo && shapeInfo.short === args.with)
            args.with = arrayAlign(shapeInfo)
    }

    static array(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: shapeRaw(args.with) }),
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
                shape: [__Math__.round((args.stop - (args.start || 0)) / (args.step || 1))]
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
            type: Float32Array,
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
                    data[i] = opsSuite.utils.randint({
                        low: args.low,
                        high: args.high
                    })

                return data
            }
        })
    }

    static matMult(args) {
        BigBox.sanitize(args)

        return opsSuite.call({
            of: args.of,
            with: args.with,
            method: this.matMult.name,
            result: args.result || new BigBox({
                type: args.type,
                header: new Header({
                    shape: [args.of.shape[0], args.with.shape[1]]
                })
            })
        })
    }

    static cross(args) {
        BigBox.sanitize(args)

        return opsSuite.call({
            of: args.of,
            with: args.with,
            method: this.cross.name,
            result: args.result || new BigBox({
                type: args.type,
                header: new Header({ shape: [3, 1] })
            })
        })
    }

    static inv(args) {
        BigBox.sanitize(args)

        return opsSuite.call({
            of: args.of,
            method: this.inv.name,
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

        const { resultAxes, resultShape } = pairAxesAndShape(args)

        return opsSuite.call({
            of: this,
            with: args.with,
            axes: resultAxes,
            method: method,
            shape: resultShape,
            result: args.result || new BigBox({
                type: this.type,
                header: new Header({ resultShape })
            })
        })
    }

    gself(args, method) {
        BigBox.sanitize(args)

        const { resultAxes, resultShape } = selfAxesAndShape(args)

        return opsSuite.call({
            of: this,
            with: args.with,
            axes: resultAxes,
            shape: this.shape,
            method: method,
            result: args.result || new BigBox({
                type: this.type,
                header: new Header({ shape: resultShape })
            })
        })
    }

    add(args) { return this.gpair(args, this.add.name) }
    divide(args) { return this.gpair(args, this.divide.name) }
    subtract(args) { return this.gpair(args, this.subtract.name) }
    multiply(args) { return this.gpair(args, this.multiply.name) }

    sum(args = {}) { return this.gself(args, this.sum.name) }
    min(args = {}) { return this.gself(args, this.min.name) }
    max(args = {}) { return this.gself(args, this.max.name) }
    norm(args = {}) { return this.gself(args, this.norm.name) }
    mean(args = {}) { return this.gself(args, this.mean.name) }

    inv(args = {}) { return BigBox.inv({ of: this, result: args.result }) }
    matMult(args) { return BigBox.matMult({ of: this, with: args.with, result: args.result }) }
    cross(args) { return BigBox.cross({ of: this, with: args.with, result: args.result }) }

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

    assign(args) {
        BigBox.sanitize(args)

        return opsSuite.call({
            of: this,
            with: args.with,
            axes: this.axes.ALL,
            shape: this.shape,
            method: this.assign.name,
            result: this
        })
    }

    toRaw(index = this.offset, depth = 0) {
        if (!this.shape.length || depth === this.shape.length)
            return Complex(
                this.data[index],
                this.data[index + 1]).toString()

        return [...new Array(this.shape[depth]).keys()].map(function (i) {
            return this.toRaw(i * this.strides[depth] + index, depth + 1)
        }, this)
    }

    valueOf() { return this.data[this.offset] }
    toString() { return this.toRaw() }
    [util.inspect.custom]() { return this.toString() }
}
