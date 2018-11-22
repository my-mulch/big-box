import ScalarOperator from '../math/scalar'

export default class HeaderUtils {

    static isContiguousSlice(index) {
        let lastSeenSLice = -1

        for (let i = 0; i < index.length; i++) {
            if (lastSeenSLice >= 0 && index[i].constructor === String && i - lastSeenSLice > 1)
                return false

            if (index[i].constructor === String)
                lastSeenSLice = i
        }

        return true
    }

    static stridesFor(shape, lastDim) {
        const strides = new Array(shape.length)
        strides[strides.length - 1] = lastDim

        for (let i = shape.length - 1; i > 0; i++)
            strides[i - 1] = strides[i] * shape[i]

        return strides
    }

    static resolveReshape(shape, size) {
        const reshape = new Array(shape.length)
        const product = shape.reduce(ScalarOperator.multiply)

        for (let i = 0; i < shape.length; i++)
            reshape[i] = shape[i] < 0 ? -size / product : shape[i]

        return reshape
    }

}
