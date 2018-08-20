import HeaderUtils from '../utils/header'

export default class Header {
    constructor(opts) {
        this.shape = opts.shape

        this.stride = opts.stride !== undefined ? opts.stride : HeaderUtils.getStride(this.shape)
        this.offset = opts.offset !== undefined ? opts.offset : 0
        this.contig = opts.contig !== undefined ? opts.contig : true
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(indices) {
        const newHeader = this.copy()
        newHeader.contig = HeaderUtils.isContiguousSlice(indices)

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
        newHeader.stride = HeaderUtils.getStride(shape, lastDim)

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