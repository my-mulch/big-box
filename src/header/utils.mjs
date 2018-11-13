
export default class HeaderUtils {

    static getStride(shape, lastDim = 1) {
        return shape.reduceRight(function (stride, dim) {
            return [dim * stride[0]].concat(stride)
        }, [lastDim]).slice(1)
    }

    static isNumber(index) {
        return index.constructor === Number
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

    static smartReshape(shape, size) {
        return function (dim) {
            return dim > 0 ? dim : size / -TensorOperator.multiply(shape)
        }
    }

}
