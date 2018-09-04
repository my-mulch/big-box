import ScalarOperator from '../math/scalar'
import utils from '../utils'

export default class Header {
    constructor(opts) {
        this.shape = opts.shape

        this.stride = opts.stride !== undefined ? opts.stride : utils.array.header.getStride(this.shape)
        this.offset = opts.offset !== undefined ? opts.offset : 0
        this.contig = opts.contig !== undefined ? opts.contig : true
    }

    copy() { return new Header(JSON.parse(JSON.stringify(this))) }

    sliceByAxis(axes) {
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
        newHeader.contig = utils.array.header.isContiguousSlice(indices)

        for (let i = 0, del = 0; i < this.shape.length; i++) {
            if (indices[i] >= 0) {
                newHeader.offset += this.stride[i] * indices[i]
                newHeader.stride.splice(i - del, 1)
                newHeader.shape.splice(i - del, 1)
                del++
            }
        }

        return newHeader
    }

    reshape(shape) {
        const newHeader = this.copy()
        const lastDim = newHeader.stride.slice(-1).pop()

        newHeader.shape = shape
        newHeader.stride = utils.array.header.getStride(shape, lastDim)

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