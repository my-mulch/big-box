
export const shapeRaw = function (A, shape = []) {
    if (A.constructor === Number || A.constructor === String)
        return shape

    return shapeRaw(A[0], shape.concat(A.length))
}

export const shapeAlign = function ({ short, delta }) {
    return short.reshape({
        shape: new Array(delta)
            .fill(1)
            .concat(short.shape)
    })
}

export const selfAxesAndShape = function ({ axes = [...this.shape.keys()] }) {
    const axesSet = new Set(axes)
    const resultAxes = axes
    const resultShape = []
    const adjustedShape = []

    for (let i = 0; i < this.shape.length; i++)
        if (!axesSet.has(i)) {
            resultAxes.push(i)
            resultShape.push(this.shape[i])
            adjustedShape.push(this.shape[i])
        } else
            adjustedShape.push(1)

    return { resultAxes, resultShape, adjustedShape }
}

export const pairAxesAndShape = function (args) {
    const axesMatch = []
    const axesMismatch = []
    const resultShape = []

    const ofShape = this.shape
    const withShape = args.with.shape

    for (let i = 0; i < ofShape.length; i++)
        if (ofShape[i] === 1) {
            axesMismatch.push(i)
            resultShape.push(withShape[i])
        }

        else if (withShape[i] === 1) {
            axesMismatch.push(i)
            resultShape.push(ofShape[i])
        }

        else if (ofShape[i] === withShape[i]) {
            axesMatch.push(i)
            resultShape.push(ofShape[i])
        }

    return {
        resultShape,
        resultAxes: axesMismatch.concat(axesMatch)
    }
}
