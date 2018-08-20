export default class HeaderUtils {
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

        for (let i = 0, j = 1; j < slicePositions.length; i++, j++)
            // if the slice positions are not next to each other return false
            if (slicePositions[i] + 1 !== slicePositions[j])
                return false

        return true
    }
}