import {
    shapeRaw, shapeAlign,
    selfAxesAndShape, pairAxesAndShape
} from './utils'

import { __Math__ } from '../../resources'

import util from 'util' // node's
import Complex from 'complex.js'

import Header from '../header'
import opsSuite from '../ops/suite'

export default class BigBox {
    constructor({ header, type, init = function () {
        return {
            real: new this.type(this.size),
            imag: new this.type(this.size),
        }
    } }) {

        for (const field in header)
            this[field] = header[field]

        this.header = header
        this.type = type || Float32Array
        this.data = init.call(this)
    }

    static array(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: shapeRaw(args.with) }),
            init: function () {

                if (args.with.constructor === Array) {
                    const flatRaw = args.with.flat(Number.POSITIVE_INFINITY)

                    const data = {
                        real: new this.type(this.size),
                        imag: new this.type(this.size),
                    }

                    for (let i = 0; i < data.real.length; i++) {
                        const cn = Complex(flatRaw[i])

                        data.real[i] = cn.re
                        data.imag[i] = cn.im
                    }

                    return data
                }

                else if (args.with.constructor === String || args.with.constructor === Number) {
                    const data = {
                        real: new this.type(this.size),
                        imag: new this.type(this.size),
                    }

                    for (let i = 0; i < data.real.length; i++) {
                        const cn = Complex(args.with)

                        data.real[i] = cn.re
                        data.imag[i] = cn.im
                    }

                    return data
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
                return {
                    real: new this.type(this.size).fill(1),
                    imag: new this.type(this.size),
                }
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
                const data = {
                    real: new this.type(this.size),
                    imag: new this.type(this.size),
                }

                for (let i = args.start || 0, j = 0; i < args.stop; i += args.step || 1, j++)
                    data.real[j] = i

                return data
            }
        })
    }


    static rand(args) {
        return new BigBox({
            type: Float32Array,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = {
                    real: new this.type(this.size),
                    imag: new this.type(this.size),
                }

                for (let i = 0; i < data.real.length; i++)
                    data.real[i] = __Math__.random() - 1

                return data
            }
        })
    }

    static randint(args) {
        return new BigBox({
            type: args.type || Int32Array,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = {
                    real: new this.type(this.size),
                    imag: new this.type(this.size),
                }

                for (let i = 0; i < data.real.length; i++)
                    data.real[i] = opsSuite.utils.randint({
                        low: args.low,
                        high: args.high
                    })

                return data
            }
        })
    }

    static eye(args) {
        return new BigBox({
            type: args.type,
            header: new Header({ shape: args.shape }),
            init: function () {
                const data = {
                    real: new this.type(this.size),
                    imag: new this.type(this.size),
                }

                const diagonal = this.strides.reduce(__Math__.add)
                const numDiags = __Math__.min(...this.shape)

                for (let i = 0; i < numDiags * diagonal; i += diagonal)
                    data.real[i] = 1

                return data
            }
        })
    }

    sanitize(args) {
        if (args.with !== undefined && args.with.constructor !== BigBox)
            args.with = BigBox.array({ with: args.with })
    }

    astype(args) {
        this.type = args.type

        this.data.real = new this.type(this.data.real)
        this.data.imag = new this.type(this.data.imag)

        return this
    }

    copy(old = this) {
        return new BigBox({
            type: this.type,
            header: this.header,
            init: function () {
                return {
                    real: old.data.real.slice(),
                    imag: old.data.imag.slice()
                }
            }
        })
    }

    ravel() {
        return BigBox
            .array({ with: this.toRaw() })
            .reshape({ shape: [-1] })
    }

    gpair(args, method) {
        this.sanitize(args)

        args.with = shapeAlign({
            short: args.with,
            delta: this.shape.length - args.with.shape.length
        })

        const {
            axesShape, axesSize,
            fullShape, fullSize
        } = pairAxesAndShape.call(this, args)

        return opsSuite.call({
            of: this,
            with: args.with,
            result: args.result || new BigBox({
                type: this.type,
                header: new Header({ shape: fullShape })
            }),
            meta: { method, axesShape, axesSize, fullShape, fullSize }
        })
    }

    gself(args, method) {
        const {
            resultShape, alignedShape,
            axesShape, axesSize,
            fullShape, fullSize
        } = selfAxesAndShape.call(this, args)

        return opsSuite.call({
            of: this,
            with: { id: '' },
            result: args.result || new BigBox({
                type: this.type,
                header: new Header({ shape: alignedShape })
            }),
            meta: { method, axesShape, axesSize, fullShape, fullSize }
        }).reshape({ shape: resultShape })
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

    matMult(args) {
        this.sanitize(args)

        return opsSuite.call({
            of: this,
            with: args.with,
            result: args.result || new BigBox({
                type: args.type,
                header: new Header({ shape: [this.shape[0], args.with.shape[1]] })
            }),
            meta: { method: this.matMult.name }
        })
    }

    cross(args) {
        this.sanitize(args)

        return opsSuite.call({
            of: this,
            with: args.with,
            result: args.result || new BigBox({
                type: args.type,
                header: new Header({ shape: [3, 1] })
            }),
            meta: { method: this.cross.name }
        })
    }

    inverse(args = {}) {
        return opsSuite.call({
            of: this,
            with: { id: '' },
            result: args.result || BigBox.eye({ shape: this.shape }),
            meta: { method: this.inverse.name }
        })
    }

    assign(args) {
        this.sanitize(args)

        return opsSuite.call({
            of: this,
            with: args.with,
            result: this,
            meta: {
                axesSize: this.size,
                fullSize: this.size,
                axesShape: [...this.shape.keys()],
                fullShape: this.shape,
                method: this.assign.name
            }
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

    toRaw(index = this.offset, depth = 0) {
        if (!this.shape.length || depth === this.shape.length)
            return Complex(
                this.data.real[index],
                this.data.imag[index]).toString()

        return [...new Array(this.shape[depth]).keys()].map(function (i) {
            return this.toRaw(i * this.strides[depth] + index, depth + 1)
        }, this)
    }

    valueOf() { return this.data.real[this.offset] }
    toString() { return JSON.stringify(this.toRaw()) }
    [util.inspect.custom]() { return this.toString() }
}
