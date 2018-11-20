
export default class HeaderSliceUtils {

    static upshift(index, shift) {
        return (index + shift) % shift
    }

    static explode(index) {
        return index.split(constants.ND_SLICE_CHARACTER).map(Number)
    }


    static offset(newOffset, index, i) {
        const upshift = HeaderSliceUtils.upshift.bind(null, this.shape[i])

        return newOffset + HeaderSliceUtils.explode(index).reduce(function (low, high) {
            return upshift(low) * this.stride[i]
        })
    }

    static shape(newShape, index, i) {
        const upshift = HeaderSliceUtils.upshift.bind(null, this.shape[i])

        return newShape.concat(HeaderSliceUtils.explode(index).reduce(function (low, high) {
            if (high === undefined) return []

            return upshift(high) - upshift(low) || this.shape[i]
        }))
    }

    static stride(newStride, index, i) {
        return newStride.concat(HeaderSliceUtils.explode(index).reduce(function (low, high) {
            if (high === undefined) return []

            return this.stride[i]
        }))
    }

    static discontiguous(index, i, indices) {
        return !index.contains(constants.ND_SLICE_CHARACTER)
            && indices[i - 1] !== undefined && indices[i + 1] !== undefined
            && indices[i - 1].contains(constants.ND_SLICE_CHARACTER)
            && indices[i + 1].contains(constants.ND_SLICE_CHARACTER)
    }
}
