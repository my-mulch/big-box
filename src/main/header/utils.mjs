import { __Math__ } from '../../resources'

export const isContiguousSlice = function (index) {
    let lastSeenSLice = -1

    for (let i = 0; i < index.length; i++) {
        if (lastSeenSLice >= 0 && index[i].constructor === String && i - lastSeenSLice > 1)
            return false

        if (index[i].constructor === String)
            lastSeenSLice = i
    }

    return true
}

export const getStrides = function (shape, startStride) {
    const strides = new Array(shape.length)

    let stride = startStride || 1
    strides[strides.length - 1] = stride

    for (let i = shape.length - 1; i > 0; i--)
        strides[i - 1] = (stride *= shape[i])

    return strides
}

export const resolveReshape = function (shape, size) {
    const reshape = new Array(shape.length)
    const product = shape.reduce(__Math__.multiply, 1)

    for (let i = 0; i < shape.length; i++)
        reshape[i] = shape[i] < 0 ? -size / product : shape[i]

    return reshape
}


