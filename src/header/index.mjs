import { multiply } from '../math/scalar'
import { ND_SLICE_CHARACTER } from '../contants'
import { stridesFor, isContiguousSlice, resolveReshape } from './utils'

export default class Header {

    constructor(opts) {
        this.shape = 'shape' in opts ? opts.shape : []
        this.offset = 'offset' in opts ? opts.offset : 0
        this.contig = 'contig' in opts ? opts.contig : true

        this.size = this.shape.reduce(multiply)

        this.strides = {}
        this.strides.local = stridesFor(this.shape, 1)
        this.strides.global = 'strides' in opts.strides ? opts.strides : this.strides.local
        this.lastStride = this.strides.global.slice(-1).pop()
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(index) {
        const shape = new Array()
        const strides = new Array()

        let offset = this.offset
        let contig = isContiguousSlice(index)

        for (let i = 0; i < this.shape.length; i++) {

            if (index[i] === constants.ND_SLICE_CHARACTER)
                shape.push(this.shape[i]),
                    strides.push(this.strides.global[i])

            else if (index[i].constructor === Number)
                offset += this.strides.global[i] * index[i]

            else if (index[i].constructor === String) {
                let [low, high] = index[i].split(constants.ND_SLICE_CHARACTER).map(Number)

                low = (low + this.shape[i]) % this.shape[i]
                high = (high + this.shape[i]) % this.shape[i]

                offset += this.strides.global[i] * low

                shape.push(high - low)
                strides.push(this.strides.global[i])
            }
        }

        return new Header({ shape, strides, offset, contig })
    }

    transpose() {
        const shape = this.shape.slice().reverse()
        const strides = this.strides.slice().reverse()
        const contig = false

        return new Header({ shape, strides, contig })
    }

    reshape(newShape) {
        const shape = resolveReshape(newShape, this.size)
        const strides = stridesFor(shape, this.lastStride)

        return new Header({ shape, strides })
    }

    axis(axis) {
        const shape = axisReshape(axis, this.shape)

        return new Header({ shape })
    }

    fullySpecified(index) {
        return index.length === this.shape.length
            && index.every(function (value) { value.constructor === Number })
    }

    lookup(index, local = this.strides.local) {
        let offset = this.offset

        for (let i = 0; i < this.shape.length; i++)
            /** Whoa.. what's this ugly shit? Peep the README */
            offset += this.strides.global[i] *
                (index.constructor === Number
                    ? Math.floor(index / local[i]) % this.shape[i]
                    : index[i])

        return offset
    }
}
