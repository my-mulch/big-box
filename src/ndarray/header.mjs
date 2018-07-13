import * as utils from '../utils'

export default class Header {
    constructor(opts) {
        this.shape = opts.shape

        this.stride = opts.stride !== undefined ? opts.stride : Header.getStride(this.shape)
        this.offset = opts.offset !== undefined ? opts.offset : 0
        this.contig = opts.contig !== undefined ? opts.contig : true
    }

    static getStride(shape, lastDim = 1) {
        return shape.reduceRight(function (stride, dim) {
            return [dim * stride[0]].concat(stride)
        }, [lastDim]).slice(1)
    }

    static isContiguousSlice(indices) {
        const slicePositions = [...indices.keys()].filter(function (i) {
            return !(indices[i] >= 0)
        })

        if (!slicePositions.length) return true // the slice was fully specified

        // a number returned means each index is separated by one. i.e. the slice is contiguous 
        return utils.isNumber(slicePositions.reduce(function (last, cur) {
            if (last === false) return false // the slice is not contiguous

            return last + 1 === cur ? cur : false // check if the slices are contiguous
        }))
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(indices) {
        const newHeader = this.copy()
        newHeader.contig = Header.isContiguousSlice(indices)

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
        newHeader.stride = Header.getStride(shape, lastDim)

        return newHeader
    }

    transpose() {
        const newHeader = this.copy()
        newHeader.stride.reverse()
        newHeader.shape.reverse()

        return newHeader
    }
}