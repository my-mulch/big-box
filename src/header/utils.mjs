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

    static stridesFor(shape, stride = 1, axis = []) {
        const strides = new Array(shape.length)

        for (let i = 0; i < axis.length; i++)
            strides[axis[i]] = stride, stride *= shape[axis[i]]

        for (let i = shape.length - 1; i > 0; i--)
            if (strides[i]) strides[i] = stride, stride *= shape[i]

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
