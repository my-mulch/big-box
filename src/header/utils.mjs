
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

    static flatten(globalIndex, index, dim) {
        return flatIndex + index * this.stride[dim]
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
