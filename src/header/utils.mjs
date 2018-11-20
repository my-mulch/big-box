import constants from '../top/contants'

export default class HeaderUtils {

    static getStride(shape, lastDim = 1) {
        return shape.reduceRight(function (stride, dim) {
            return [dim * stride[0]].concat(stride)
        }, [lastDim]).slice(1)
    }

    static isContiguousSlice(indices) {
        let lastSeenSLice = -1

        for (let i = 0; i < indices.length; i++) {
            if (lastSeenSLice >= 0 && indices[i].constructor === String && i - lastSeenSLice > 1)
                return false

            if (indices[i].constructor === String)
                lastSeenSLice = i
        }

        return true
    }

    static upshift(index, shift) {
        return (index + shift) % shift
    }

    static explode(index) {
        return index.split(constants.ND_SLICE_CHARACTER).map(Number)
    }


    static shape(newShape, index, i) {
        const upshift = HeaderUtils.upshift.bind(null, this.shape[i])

        return newShape.concat(HeaderUtils.explode(index).reduce(function (low, high) {
            if (high === undefined) return []

            return upshift(high) - upshift(low) || this.shape[i]
        }))
    }

    static stride(newStride, index, i) {
        return newStride.concat(HeaderUtils.explode(index).reduce(function (low, high) {
            if (high === undefined) return []

            return this.stride[i]
        }))
    }

    static offset(newOffset, index, i) {
        return newOffset + HeaderUtils.explode(index).reduce(function (low, high) {
            return (low + this.shape[i]) % this.shape[i] * this.stride[i]
        })
    }



    static flatten(globalIndex, index, dim) {
        return globalIndex + index * this.stride[dim]
    }

    static inflate(index) {
        return function (globalIndex, stride, dim) {
            return globalIndex + Math.floor(index / stride) % this.shape[dim]
        }
    }

    static reshape(dim, _, shape) {
        return dim > 0 ? dim : size / -TensorOperator.multiply(shape)
    }

}
