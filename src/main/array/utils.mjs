import { AXIS_INNER_CHARACTER } from '../../resources'

export const __Math__ = Object.assign(Math, {
    add: function (a, b) { return a + b },
    subtract: function (a, b) { return a - b },
    divide: function (a, b) { return a / b },
    multiply: function (a, b) { return a * b },
})

export const sizeup = function sizeup(A, shape = []) {
    if (A.constructor === Number || A.constructor === String)
        return shape

    return sizeup(A[0], shape.concat(A.length))
}

export const broadcast = function (aShape, bShape) {
    const newShape = new Array(aShape.length)
    const newOrder = new Array(aShape.length)

    for (let dim = null, match = null,
        i = newShape.length - 1,
        ai = aShape.length - 1,
        bi = bShape.length - 1; i >= 0; i-- , ai-- , bi--) {

        if (bi < 0)
            dim = aShape[ai], match = AXIS_INNER_CHARACTER

        else if (bShape[bi] === 1)
            dim = aShape[ai], match = AXIS_INNER_CHARACTER

        else if (aShape[ai] === 1)
            dim = bShape[bi], match = AXIS_INNER_CHARACTER

        else if (aShape[ai] === bShape[bi])
            dim = aShape[ai], match = dim

        newShape[i] = dim
        newOrder[i] = match
    }

    return { newShape, newOrder }
}


