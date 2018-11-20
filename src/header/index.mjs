import ScalarOperator from '../math/scalar'
import utils from '../top/utils'

export default class Header {
    constructor(opts) {
        this.stride = {}

        this.shape = 'shape' in opts ? opts.shape : []
        this.offset = 'offset' in opts ? opts.offset : 0
        this.contig = 'contig' in opts ? opts.contig : true

        this.stride.local = 'local' in opts.stride ? opts.stride.local : utils.header.getStride(this.shape)
        this.stride.global = 'global' in opts.stride ? opts.stride.global : this.stride.local

        this.size = this.shape.reduce(ScalarOperator.multiply)
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    fullySpecified(indices) {
        return indices.length === this.shape.length
            && indices.every(function (index) { return index.constructor === Number })
    }

    flatten(indices) {
        return indices.reduce(utils.header.flatten.bind(this), this.offset)
    }

    inflate(index) {
        return this.stride.local.reduce(utils.header.inflate(index).bind(this), this.offset)
    }

    slice(indices) {
        const newHeader = this.copy()

        for (let i = 0, del = 0; i < this.shape.length; i++) {
            if (indices[i] === undefined) break

            let [low, high] = indices[i].split(':').map(Number)

            if (high === 0 && low === 0) continue // sliced entire axis
            if (high <= 0) high += this.shape[i]
            if (low < 0) low += this.shape[i]

            newHeader.shape[i - del] = high - low
            newHeader.offset += this.stride[i] * low

            if (high === undefined) { // if a simple index is specified
                newHeader.stride.splice(i - del, 1)
                newHeader.shape.splice(i - del, 1)
                del++
            }
        }

        newHeader.contig = utils.header.isContiguousSlice(indices)
        newHeader.size = newHeader.shape.reduce(ScalarOperator.multiply)

        return newHeader
    }

    axis(axes) {
        axes.sort(ScalarOperator.subtract)

        return this.shape.map(function (dim, i) {
            if (axes[0] !== i)
                return ':'

            axes.shift()
            return dim
        })
    }

    reshape(shape) {
        const newShape = shape.map(utils.header.reshape)
        const lastStride = this.stride.slice(-1).pop()

        return new Header({
            shape: newShape,
            stride: { global: utils.header.getStride(newShape, lastStride) }
        })
    }

    transpose() {
        return new Header({
            shape: this.shape.slice().reverse(),
            stride: { global: this.stride.slice().reverse() },
            contig: false
        })
    }
}