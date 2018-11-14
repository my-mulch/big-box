import ScalarOperator from '../math/scalar'
import TensorOperator from '../math/tensor'
import utils from '../top/utils'

export default class Header {
    constructor(opts) {
        this.shape = opts.shape
        this.size = TensorOperator.multiply(this.shape)

        this.stride = opts.stride !== undefined ? opts.stride : utils.header.getStride(this.shape)
        this.offset = opts.offset !== undefined ? opts.offset : 0
        this.contig = opts.contig !== undefined ? opts.contig : true
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    fullySpecified(indices) {
        return indices.length === this.shape.length && indices.every(utils.header.isNumber)
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

    slice(indices) {
        const newHeader = this.copy()

        for (let i = 0, del = 0; i < this.shape.length; i++) {
            if (indices[i] === undefined) break

            let [low, high] = indices[i].split(':').map(Number)

            if (high === 0 && low === 0) continue // sliced entire axis
            if (high <= 0) high += this.shape[i]

            newHeader.shape[i - del] = high - low
            newHeader.offset += this.stride[i] * low

            if (high === undefined) { // if a simple index is specified
                newHeader.stride.splice(i - del, 1)
                newHeader.shape.splice(i - del, 1)
                del++
            }
        }

        newHeader.contig = utils.header.isContiguousSlice(indices)
        newHeader.size = TensorOperator.multiply(newHeader.shape)

        return newHeader
    }

    reshape(shape) {
        const newHeader = this.copy()
        const lastDim = newHeader.stride[newHeader.stride.length - 1]

        newHeader.shape = shape.map(utils.header.smartReshape(shape, this.size))
        newHeader.stride = utils.header.getStride(newHeader.shape, lastDim)

        return newHeader
    }

    transpose() {
        const newHeader = this.copy()

        newHeader.stride.reverse()
        newHeader.shape.reverse()
        newHeader.contig = false

        return newHeader
    }
}