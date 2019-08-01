
export const shapeRaw = function (A, shape = []) {
    if (A.constructor === Number || A.constructor === String)
        return shape

    return shapeRaw(A[0], shape.concat(A.length))
}

export const selfAxesAndShape = function ({ axes, of }) {
    const axesSet = new Set(axes)
    const resultAxes = axes
    const resultShape = []

    for (let i = 0; i < of.shape.length; i++)
        if (!axesSet.has(i)) {
            resultAxes.push(i)
            resultShape.push(i)
        }

    return { resultAxes, resultShape }
}

export const pairAxesAndShape = function (args) {
    const resultAxes = []
    const resultShape = []

    const ofShape = args.of.shape
    const withShape = args.with.shape

    for (i = 0; i < of.shape.length; i++)
        if (ofShape[i] === 1) {
            resultAxes.unshift(i)
            resultShape.push(withShape[i])
        }

        else if (withShape[i] === 1) {
            resultAxes.unshift(i)
            resultShape.push(ofShape[i])
        }

        else if (ofShape[i] === withShape[i]) {
            resultAxes.push(i)
            resultShape.push(ofShape[i])
        }

    return { resultAxes, resultShape }
}

export const broadcast = function (arrays) {
    const shape = new Array(arrays.of.shape.length)
    const order = new Array(arrays.of.shape.length)

    for (let dim = null, match = null, i = 0; i < shape.length; i++) {
        if (ofShape[ai] === 1) {
            dim = withShape[bi]
            match = AXIS_INNER_CHARACTER
        }

        else if (withShape[bi] === 1) {
            dim = ofShape[ai]
            match = AXIS_INNER_CHARACTER
        }

        else if (ofShape[ai] === withShape[bi]) {
            dim = ofShape[ai]
            match = dim
        }

        shape[i] = dim
        order[i] = match
    }

    return { shape, axes }
}

export const shapeAlign = function (arrays) {
    if (arrays.of.shape.length === arrays.with.shape.length)
        return null

    const short = arrays.of.shape.length < arrays.with.shape.length
        ? arrays.of
        : arrays.with

    const long = arrays.of.shape.length > arrays.with.shape.length
        ? arrays.of
        : arrays.with

    return { short, long, delta: long.shape.length - short.shape.length }
}

export const arrayAlign = function ({ short, long, delta }) {
    return short.reshape({
        shape: new Array(delta)
            .fill(1)
            .concat(long.shape)
    })
}